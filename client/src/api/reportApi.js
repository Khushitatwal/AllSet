import axios from "./axios";

export const getReport = async () => {
  const response = await axios.get("/reports/progress");
  return response.data.report;
};
