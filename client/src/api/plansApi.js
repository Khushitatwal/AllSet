import axios from "./axios";

export const createPlan = async (planData) => {
  const res = await axios.post("/plans", planData);
  return res.data;
};

export const getPlans = async () => {
  const response = await axios.get("/plans");
  return response.data;
};

export const updatePlan = async (id, updatedData) => {
  const response = await axios.patch(`/plans/${id}`, updatedData);
  return response.data;
};

export const deletePlan = async (id) => {
  const response = await axios.delete(`/plans/${id}`);
  return response.data;
};

export const deleteAllPlans = async () => {
  const response = await axios.delete("/plans/all");
  return response.data;
};
