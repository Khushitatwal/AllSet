import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: {
    xs: 250,
    sm: 400,
  },
};

const priorities = Array.from({ length: 10 }, (_, i) => i + 1);

const TaskModal = ({ open, handleClose, onSubmit, initialData, planId }) => {
  const isEdit = Boolean(initialData);

  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(5);

  useEffect(() => {
    if (isEdit) {
      setTitle(initialData.title || "");
      setEstimatedTime(initialData.estimatedTime || 1);
      setDeadline(dayjs(initialData.deadline).format("YYYY-MM-DD") || "");
      setPriority(initialData.priority || 5);
    } else {
      // Reset if not editing
      setTitle("");
      setEstimatedTime(1);
      setDeadline("");
      setPriority(5);
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline || !estimatedTime) return;

    const taskData = {
      title,
      estimatedTime: Number(estimatedTime),
      deadline: new Date(deadline),
      priority: Number(priority),
      planId, // include planId
    };

    if (isEdit) {
      taskData._id = initialData._id; // required for updating
    }

    onSubmit(taskData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {isEdit ? "Edit Task" : "Add New Task"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <TextField
              label="Estimated Time (hours)"
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              required
            />

            <TextField
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />

            <TextField
              select
              label="Priority"
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained">
              {isEdit ? "Update Task" : "Create Task"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;
