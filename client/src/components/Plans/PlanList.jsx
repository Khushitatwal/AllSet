import React from "react";
import { Grid } from "@mui/material";
import PlanCard from "./PlanCard";

const PlanList = ({ plans, onDelete, onUpdate, onCardClick }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {plans.map((plan) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={plan._id}>
          <PlanCard
            plan={plan}
            onDelete={() => onDelete(plan._id)}
            onUpdate={() => onUpdate(plan)}
            onClick={() => onCardClick(plan._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PlanList;
