import axios from "./axios";

export const login = async (data) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};
