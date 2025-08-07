import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useLocation } from "react-router-dom";
import TaskCard from "../components/Tasks/TaskCard";
import {
  allTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
  createTask,
} from "../api/tasksApi";
import TaskModal from "../components/Tasks/TaskModal";

const Tasks = () => {
  const location = useLocation();
  const planIdFromState = location.state?.planId;
  const { planId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await allTasks();
      if (planIdFromState || planId) {
        const pid = planIdFromState || planId;
        const filteredTasks = res.data.filter((task) => task.planId === pid);
        setTasks(filteredTasks);
      } else {
        setTasks(res.data);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [planId]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };
  const handleDeleteAll = async () => {
    const pid = planIdFromState || planId;
    try {
      await deleteAllTasks(pid);
      await fetchTasks();
    } catch (e) {
      console.log(e);
      console.log(pid);
    }
  };
  const handleStatusChange = async (taskId, updatedStatus) => {
    try {
      await updateTask(taskId, { status: updatedStatus });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status: updatedStatus } : t
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      await fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };
  const handleDeleteCompleted = async () => {
    const pid = planIdFromState || planId;
    const completedTasks = tasks.filter((t) => t.status === "completed");
    await Promise.all(completedTasks.map((t) => deleteTask(t._id)));
    await fetchTasks();
  };

  const currentPlanId = planIdFromState || planId;
  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontFamily="inherit"
      >
        Tasks
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={4}
        flexWrap="wrap"
        justifyContent="center"
        rowGap={2}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Create Task
        </Button>

        {currentPlanId && (
          <>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={handleDeleteAll}
            >
              Delete All
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<DeleteSweepIcon />}
              onClick={handleDeleteCompleted}
            >
              Delete Completed
            </Button>
          </>
        )}
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : tasks.length === 0 ? (
        <Typography>No tasks found for this plan.</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {tasks.map((task) => (
            <Grid item key={task._id}>
              <TaskCard
                task={task}
                onStatusToggle={handleStatusChange}
                onDelete={handleDelete}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.status === "completed"}
                      onChange={() =>
                        handleStatusChange(
                          task._id,
                          task.status === "completed" ? "pending" : "completed"
                        )
                      }
                    />
                  }
                  label={task.status === "completed" ? "Completed" : "Pending"}
                />
              </TaskCard>
            </Grid>
          ))}
        </Grid>
      )}
      <TaskModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSubmit={handleAddTask}
        planId={currentPlanId}
      />
    </Box>
  );
};

export default Tasks;
