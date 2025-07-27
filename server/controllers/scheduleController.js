const Task = require("../models/Task");
const StudyPlan = require("../models/StudyPlan");
const sendMail = require("../utils/sendMail");
const generateSchedulePDF = require("../utils/generatePDF");

exports.getDailySchedule = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const targetDate = new Date(date);
    const nextDate = new Date(targetDate);
    nextDate.setDate(targetDate.getDate() + 1);

    // Find all tasks scheduled for this specific date
    const tasks = await Task.find({
      userId: req.user.id,
      scheduledDate: {
        $gte: targetDate,
        $lt: nextDate,
      },
    }).sort({ priority: -1, deadline: 1 });

    res.status(200).json({ date: targetDate.toISOString(), tasks });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch daily schedule",
      error: error.message,
    });
  }
};

exports.scheduleTasks = async (req, res) => {
  try {
    const totalDailyHours = Number(req.query.dailyHours);
    const days = Number(req.query.days) || 7;

    if (!totalDailyHours) {
      return res.status(400).json({
        msg: "Please enter the study hours you want to schedule each day!",
      });
    }

    const plans = await StudyPlan.find({ userId: req.user.id });
    const totalMinHours = plans.reduce((sum, p) => sum + p.minDailyHours, 0);
    if (totalMinHours > totalDailyHours) {
      return res.status(400).json({
        msg: "Total minDailyHours across plans exceeds dailyHours",
      });
    }

    const tasks = await Task.find({
      userId: req.user.id,
      status: "pending",
    }).sort([
      ["priority", 1],
      ["deadline", 1],
      ["estimatedTime", 1],
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //  Group tasks by planId
    const planTaskMap = {};
    for (const plan of plans) {
      planTaskMap[plan._id] = tasks.filter(
        (t) => t.planId.toString() === plan._id.toString()
      );
    }

    // Initialize schedule per day
    const schedule = {};
    for (let i = 1; i <= days; i++) {
      const dateKey = new Date(today);
      dateKey.setDate(today.getDate() + i);
      const dateStr = dateKey.toISOString().split("T")[0];
      schedule[dateStr] = { hoursLeft: totalDailyHours, tasks: [] };
    }

    //  Allocate each plan's minDailyHours first
    for (let i = 1; i <= days; i++) {
      const dateKey = new Date(today);
      dateKey.setDate(today.getDate() + i);
      const dateStr = dateKey.toISOString().split("T")[0];

      for (const plan of plans) {
        const minHours = plan.minDailyHours;
        let hoursLeft = minHours;
        const dayHours = schedule[dateStr];

        const planTasks = planTaskMap[plan._id] || [];

        for (let t = 0; t < planTasks.length && hoursLeft > 0; t++) {
          const task = planTasks[t];
          if (new Date(task.deadline) < today || task._scheduled) continue;

          const hoursToSchedule = Math.min(
            task.estimatedTime,
            hoursLeft,
            dayHours.hoursLeft
          );
          if (hoursToSchedule > 0) {
            dayHours.tasks.push({
              ...task._doc,
              scheduledPart: hoursToSchedule,
            });
            hoursLeft -= hoursToSchedule;
            dayHours.hoursLeft -= hoursToSchedule;
            task.estimatedTime -= hoursToSchedule;

            if (!task._scheduled) {
              await Task.findByIdAndUpdate(task._id, {
                scheduledDate: dateKey,
              });
              task._scheduled = true;
            }

            if (task.estimatedTime <= 0) {
              planTasks.splice(t, 1);
              t--;
            }
          }
        }
      }
    }

    // Use remaining daily hours for global task pool
    for (let i = 1; i <= days; i++) {
      const dateKey = new Date(today);
      dateKey.setDate(today.getDate() + i);
      const dateStr = dateKey.toISOString().split("T")[0];

      const dayHours = schedule[dateStr];
      for (let t = 0; t < tasks.length && dayHours.hoursLeft > 0; t++) {
        const task = tasks[t];
        if (new Date(task.deadline) < today || task.estimatedTime <= 0)
          continue;

        const hoursToSchedule = Math.min(
          task.estimatedTime,
          dayHours.hoursLeft
        );
        if (hoursToSchedule > 0) {
          dayHours.tasks.push({
            ...task._doc,
            scheduledPart: hoursToSchedule,
          });
          dayHours.hoursLeft -= hoursToSchedule;
          task.estimatedTime -= hoursToSchedule;

          if (!task._scheduled) {
            await Task.findByIdAndUpdate(task._id, {
              scheduledDate: dateKey,
            });
            task._scheduled = true;
          }
        }
      }
    }

    //  Final schedule format (with grouping by taskId per day)
    const finalSchedule = {};

    for (let date in schedule) {
      const tasksForDate = schedule[date].tasks;

      if (!Array.isArray(tasksForDate) || tasksForDate.length === 0) {
        continue;
      }
      const taskMap = new Map();

      for (const task of schedule[date].tasks) {
        const taskId = task._id.toString();

        if (taskMap.has(taskId)) {
          const existing = taskMap.get(taskId);
          existing.scheduledPart += task.scheduledPart;
        } else {
          const plan = plans.find(
            (p) => p._id.toString() === task.planId.toString()
          );

          taskMap.set(taskId, {
            taskId: task._id,
            title: task.title,
            estimatedTime: task.estimatedTime,
            planId: task.planId,
            planTitle: plan ? plan.title : "Unknown Plan",
            priority: task.priority,
            scheduledPart: task.scheduledPart,
          });
        }
      }

      finalSchedule[date] = Array.from(taskMap.values());
    }
    const pdfBuffer = await generateSchedulePDF(finalSchedule);

    // Send Email
    await sendMail({
      to: req.user.email,
      subject: "Your Weekly Study Schedule",
      text: `Hi ${req.user.firstName},

Hope you're doing great! Attached is your personalized study schedule, thoughtfully generated based on your selected plans, deadlines, and priorities. We hope this helps you stay focused, consistent, and stress-free throughout your study journey.
If you make any updates, feel free to regenerate the schedule anytime to stay on track.

With regards,  
AllSet Team`,
      attachments: [
        {
          filename: "schedule.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
    return res.json({
      message: "Schedule generated successfully",
      schedule: finalSchedule,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", err });
  }
};
