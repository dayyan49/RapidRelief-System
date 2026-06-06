import axios from "axios";
import { getToken } from "../utils/token.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    let message = error.response?.data?.message || error.message || "Request failed";
    if (error.code === "ECONNABORTED") {
      message = "Request timed out. Check that the backend server is running.";
    } else if (!error.response) {
      message = "Cannot reach the server. Start the backend (cd backend/Node_backend && npm start) and restart the frontend dev server.";
    }
    error.toastMessage = message;
    return Promise.reject(error);
  }
);

export default api;
