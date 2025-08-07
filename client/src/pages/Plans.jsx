import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  getPlans,
  deleteAllPlans,
  deletePlan,
  updatePlan,
  createPlan,
} from "../api/plansApi";
import PlanModal from "../components/Plans/PlanModal";
import PlanList from "../components/Plans/PlanList";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

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

  useEffect(() => {
    fetchPlans();
  }, []);

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

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (selectedPlan) {
        await updatePlan(selectedPlan._id, formData);
      } else {
        if (!formData.title || !formData.totalHours || !formData.deadline) {
          alert("Please fill in all fields.");
          return;
        }
        await createPlan(formData);
      }
      setModalOpen(false);
      setSelectedPlan(null);
      fetchPlans();
    } catch (err) {
      console.error("Create/Update failed", err);
    }
  };

  const openCreateModal = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  const openUpdateModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <br />
      <Typography
        align="center"
        sx={{ fontFamily: "inherit", fontSize: "large", fontWeight: "bold" }}
      >
        Your plans , {user?.firstName || "User"}!
      </Typography>
      <Box p={3}>
        <Box mb={3} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={openCreateModal}>
            Create Plan
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteAll}>
            Delete All Plans
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : plans.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center">
            You have no plans. Create one!
          </Typography>
        ) : (
          <PlanList
            plans={plans}
            onDelete={handleDeletePlan}
            onUpdate={openUpdateModal}
          />
        )}
      </Box>

      <PlanModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          setSelectedPlan(null);
        }}
        handleSubmit={handleCreateOrUpdate}
        initialData={selectedPlan}
      />
    </Container>
  );
};

export default Plans;
