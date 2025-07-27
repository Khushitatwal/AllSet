const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  scheduleTasks,
  getDailySchedule,
} = require("../controllers/scheduleController");

router.get("/", auth, getDailySchedule);
router.get("/generate", auth, scheduleTasks);

module.exports = router;
