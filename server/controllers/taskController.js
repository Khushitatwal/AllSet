const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, priority, estimatedTime, deadline, planId } = req.body;

  if (!title || !priority || !estimatedTime || !deadline || !planId)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const task = await Task.create({
      title,
      priority,
      estimatedTime,
      deadline,
      planId,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { planId } = req.query;
    const filter = { userId: req.user.id };

    if (planId) {
      filter.planId = planId;
    }

    const tasks = await Task.find(filter).sort({ priority: 1, deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

exports.fullUpdateTask = async (req, res) => {
  const { title, priority, estimatedTime, deadline, status } = req.body;

  if (!title || !priority || !estimatedTime || !deadline || !status) {
    return res
      .status(400)
      .json({ msg: "All fields are required for full update." });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, priority, estimatedTime, deadline, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
};

exports.partialUpdateTask = async (req, res) => {
  const updates = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updates },
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error with partial update" });
  }
};
exports.markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "completed";
    await task.save();

    res.status(200).json({ message: "Task marked as completed", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task" });
  }
};

exports.deleteAllTasks = async (req, res) => {
  try {
    const deleted = await Task.deleteMany({
      planId: req.params.planId,
      userId: req.user.id,
    });

    res.json({
      msg: `Deleted ${deleted.deletedCount} task(s) from this plan.`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete tasks", error: err.message });
  }
};

exports.deleteCompletedTasks = async (req, res) => {
  try {
    const deleted = await Task.deleteMany({
      planId: req.params.planId,
      userId: req.user.id,
      status: "completed",
    });

    res.json({
      msg: `Deleted ${deleted.deletedCount} completed task(s) from this plan.`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to delete completed tasks", error: err.message });
  }
};
