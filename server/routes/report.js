const express = require("express");
const { progressReport } = require("../controllers/reportController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/progress", auth, progressReport);

module.exports = router;
