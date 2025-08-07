import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";

const PlanModal = ({ open, handleClose, handleSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    totalHours: "",
    minDailyHours: "",
    deadline: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        totalHours: initialData.totalHours || "",
        minDailyHours: initialData.minDailyHours || "",
        deadline: initialData.deadline
          ? new Date(initialData.deadline).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm({
        title: "",
        totalHours: "",
        minDailyHours: "",
        deadline: "",
      });
    }
  }, [initialData]);

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const onSubmit = () => {
    handleSubmit(form);
    setForm({
      title: "",
      totalHours: "",
      minDailyHours: "",
      deadline: "",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          width: {
            xs: 250,
            sm: 400,
          },
        }}
      >
        <DialogTitle>{initialData ? "Update Plan" : "Create Plan"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={onChange}
              fullWidth
            />

            <TextField
              label="Total Hours"
              name="totalHours"
              value={form.totalHours}
              onChange={onChange}
              type="number"
              inputProps={{ min: 0, max: 20 }}
              fullWidth
            />
            <TextField
              label="Min Daily Hours"
              name="minDailyHours"
              value={form.minDailyHours}
              onChange={onChange}
              type="number"
              inputProps={{ min: 0, max: 20 }}
              fullWidth
            />
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit} variant="contained">
            {initialData ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PlanModal;
