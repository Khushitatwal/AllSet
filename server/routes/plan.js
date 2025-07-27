const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
  deleteAllPlans,
} = require("../controllers/planController");

router.post("/", auth, createPlan);
router.get("/", auth, getPlans);
router.patch("/:id", auth, updatePlan);
router.delete("/all", auth, deleteAllPlans);
router.delete("/:id", auth, deletePlan);

module.exports = router;
