const Task = require("../models/Task");
const StudyPlan = require("../models/StudyPlan");

exports.progressReport = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.id });

    const report = [];

    for (const plan of plans) {
      const allTasks = await Task.find({ planId: plan._id });

      const completedTasks = allTasks.filter(
        (task) => task.status === "completed"
      );
      const pendingTasks = allTasks.filter((task) => task.status === "pending");
      const overdueTasks = allTasks.filter((task) => {
        return (
          task.status !== "completed" && new Date(task.deadline) < new Date()
        );
      });

      const totalTime = allTasks.reduce(
        (acc, task) => acc + (task.estimatedTime || 0),
        0
      );
      const completedTime = completedTasks.reduce(
        (acc, task) => acc + (task.estimatedTime || 0),
        0
      );

      const progressPercent =
        allTasks.length > 0
          ? Math.round((completedTasks.length / allTasks.length) * 100)
          : 0;

      const daysLeft = Math.ceil(
        (new Date(plan.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );

      report.push({
        planId: plan._id,
        title: plan.title,
        deadline: plan.deadline,
        totalTasks: allTasks.length,
        completedTasks: completedTasks.length,
        pendingTasks: pendingTasks.length,
        overdueTasks: overdueTasks.length,
        progressPercent,
        totalTime,
        completedTime,
        isExpired: new Date() > plan.deadline,
        daysLeft: daysLeft < 0 ? 0 : daysLeft,
        scheduleGenerated: plan.schedule && plan.schedule.length > 0,
      });
    }

    res.status(200).json({ report });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate report", error: error.message });
  }
};
