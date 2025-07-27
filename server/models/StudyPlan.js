const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    totalHours: { type: Number, required: true },
    deadline: { type: Date, required: true },
    minDailyHours: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
