import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  timeout: 5000,
  withCredentials: true,
});

export default api;
