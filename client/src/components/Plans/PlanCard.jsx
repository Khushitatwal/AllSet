import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { DeleteOutline, Edit } from "@mui/icons-material";
const PlanCard = ({ plan, onDelete, onUpdate }) => {
  const { title, totalHours, minDailyHours, deadline, createdAt } = plan;

  const formatDate = (dateStr) =>
    format(new Date(dateStr), "dd MMM yyyy, hh:mm a");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks?planId=${plan._id}`, {
      state: { planId: plan._id },
    });
  };

  return (
    <Card elevation={3}>
      <CardContent
        onClick={handleClick}
        sx={{ cursor: "pointer", marginBottom: 2 }}
      >
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
        </Typography>{" "}
        <hr />
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong> {formatDate(createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            size="small"
            color="error"
            onClick={onDelete}
            startIcon={<DeleteOutline />}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={onUpdate}
            startIcon={<Edit />}
          >
            Update
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PlanCard;
