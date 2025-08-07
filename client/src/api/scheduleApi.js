import axios from "./axios";

export const generateSchedule = async ({ days, dailyHours }) => {
  const response = await axios.get(
    `/schedule/generate?days=${days}&dailyHours=${dailyHours}`
  );
  console.log(response.data);
  return response.data;
};
