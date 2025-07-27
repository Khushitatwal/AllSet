const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("database connected!"))
  .catch((err) => console.log("ERROR:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/plans", require("./routes/plan"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/schedule", require("./routes/schedule"));
app.use("/api/reports", require("./routes/report"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
