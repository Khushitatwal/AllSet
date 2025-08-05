// src/components/PlanCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { format } from "date-fns"; // Install this if not already

const PlanCard = ({ plan, onDelete, onUpdate }) => {
  const { title, totalHours, minDailyHours, deadline, createdAt } = plan;

  const formatDate = (dateStr) =>
    format(new Date(dateStr), "dd MMM yyyy, hh:mm a");

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title || "Untitled Plan"}
        </Typography>
        <Typography variant="body2">
          <strong>Total Hours:</strong> {totalHours}
        </Typography>
        <Typography variant="body2">
          <strong>Min Daily Hours:</strong> {minDailyHours}
        </Typography>
        <Typography variant="body2">
          <strong>Deadline:</strong> {formatDate(deadline)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong> {formatDate(createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button size="small" color="primary" onClick={onUpdate}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlanCard;
