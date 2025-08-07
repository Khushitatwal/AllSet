import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const Calender = ({ scheduleData }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!scheduleData) return;

    const scheduleEvents = [];

    Object.entries(scheduleData).forEach(([date, tasks]) => {
      tasks.forEach((task) => {
        const start = new Date(date);
        const end = new Date(date);
        const duration = task.estimatedTime || 1;

        // Simulate time slots: 9 AM to X
        start.setHours(9);
        end.setHours(9 + duration);

        scheduleEvents.push({
          title: `${task.title} (${task.planTitle})`,
          start,
          end,
          allDay: false,
        });
      });
    });

    setEvents(scheduleEvents);
  }, [scheduleData]);

  return (
    <Box>
      <Typography variant="h5" mt={5} mb={2}>
        Calendar View
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
};
//({ scheduleData }) => {
//   // Transform scheduleData into FullCalendar events
//   const events = Object.entries(scheduleData || {}).flatMap(([date, tasks]) =>
//     tasks.map((task) => ({
//       title: `${task.title} (${task.estimatedTime}h)`,
//       date: date,
//     }))
//   );

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2 style={{ marginBottom: "1rem" }}>Task Calendar</h2>
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         height="auto"
//       />
//     </div>
//   );
// };

export default Calender;
