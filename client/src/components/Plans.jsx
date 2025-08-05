import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, CircularProgress } from "@mui/material";
import {
  getPlans,
  deleteAllPlans,
  deletePlan,
  updatePlan,
  createPlan,
} from "../api/plansApi";
import PlanCard from "./PlanCard";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllPlans();
      setPlans([]);
    } catch (err) {
      console.error("Failed to delete all plans:", err);
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  const handleUpdatePlan = async (id) => {
    const updatedData = {
      title: "Updated Plan Title",
      description: "Updated Description",
    };

    try {
      await updatePlan(id, updatedData);
      fetchPlans();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleCreatePlan = async () => {
    const newPlan = {
      title: "New Plan",
      description: "Plan description here",
    };

    try {
      await createPlan(newPlan);
      fetchPlans();
    } catch (err) {
      console.error("Create plan failed", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Box p={3}>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleCreatePlan}>
          Create Plan
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteAll}>
          Delete All Plans
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : plans.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No plans found. Create one!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan._id}>
              <PlanCard
                plan={plan}
                onDelete={() => handleDeletePlan(plan._id)}
                onUpdate={() => handleUpdatePlan(plan._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Plans;
