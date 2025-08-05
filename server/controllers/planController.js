const StudyPlan = require("../models/StudyPlan");
const Task = require("../models/Task");

exports.createPlan = async (req, res) => {
  const { title, totalHours, deadline, minDailyHours } = req.body;

  if (!title || !totalHours || !deadline) {
    return res
      .status(400)
      .json({ msg: "All fields except Minimum Daily Hours are required" });
  }

  try {
    const newPlan = await StudyPlan.create({
      title,
      totalHours,
      deadline,
      minDailyHours: minDailyHours || 0,
      userId: req.user.id,
    });

    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
exports.updatePlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({ msg: "Plan not found or unauthorized" });
    }
    res.json(plan);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
exports.deletePlan = async (req, res) => {
  try {
    const plan = await StudyPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!plan) {
      return res.status(404).json({ msg: "Plan not found or unauthorized" });
    }
    await Task.deleteMany({ planId: plan._id });
    res.json({ msg: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deleteAllPlans = async (req, res) => {
  try {
    const userPlans = await StudyPlan.find({ userId: req.user.id });
    const planIds = userPlans.map((plan) => plan._id);

    await Task.deleteMany({ planId: { $in: planIds } });

    const result = await StudyPlan.deleteMany({ userId: req.user.id });

    res.json({
      msg: `${result.deletedCount} plans deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
