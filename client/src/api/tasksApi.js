import axios from "./axios";

export const allTasks = () => {
  return axios.get("/tasks");
};
export const createTask = (taskData) => {
  return axios.post("/tasks", taskData);
};

export const deleteCompletedTasks = (planId) => {
  return axios.delete(`/tasks/plan/${planId}/completed`);
};
export const deleteAllTasks = (planId) => {
  return axios.delete(`/tasks/plan/${planId}`);
};
export const updateTask = (taskId, taskData) => {
  return axios.patch(`/tasks/${taskId}`, taskData);
};
export const deleteTask = (taskId) => {
  return axios.delete(`/tasks/${taskId}`);
};
