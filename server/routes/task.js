const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  fullUpdateTask,
  partialUpdateTask,
  markTaskCompleted,
  deleteTask,
  deleteAllTasks,
  deleteCompletedTasks,
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);

router.delete("/plan/:planId/completed", auth, deleteCompletedTasks);
router.delete("/plan/:planId", auth, deleteAllTasks);

router.put("/:id", auth, fullUpdateTask);
router.patch("/:id", auth, partialUpdateTask);
router.delete("/:id", auth, deleteTask);
router.patch("/:id/status", auth, markTaskCompleted);

module.exports = router;
