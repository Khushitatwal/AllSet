import axios from "axios";

const instance = axios.create({
  baseURL: "https://allset-kzj6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
