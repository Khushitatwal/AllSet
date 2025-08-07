import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { generateSchedule } from "../api/scheduleApi";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Schedule = () => {
  const [days, setDays] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [events, setEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await generateSchedule({ days, dailyHours });

      const data = response.schedule;

      // Convert schedule to calendar events
      const calendarEvents = [];
      for (let date in data) {
        data[date].forEach((task) => {
          calendarEvents.push({
            title: `${task.title} (${task.estimatedTime}h)`,
            date,
          });
        });
      }

      setEvents(calendarEvents);
      setSnackbar({
        open: true,
        message: "Schedule generated successfully!",
        severity: "success",
      });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.msg || "Failed to generate schedule.";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      pt={4}
      px={{ xs: "5vw", md: "10vw" }}
    >
      <Box width="100%" maxWidth={800}>
        <Typography variant="h4" gutterBottom fontFamily="inherit">
          Generate your schedule
        </Typography>

        <Box component="form" onSubmit={handleSubmit} maxWidth={500}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Number of Days"
              type="number"
              value={days || 7}
              onChange={(e) => setDays(e.target.value)}
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Daily Study Hours"
              type="number"
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ height: "100%", width: "100%" }}
            >
              Generate
            </Button>
          </Stack>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>

      {events.length === 0 && (
        <Typography variant="body1" color="text.secondary" mt={2} mb={2}>
          No schedule generated yet. Fill the form above to generate one.
        </Typography>
      )}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </Box>
  );
};

export default Schedule;
