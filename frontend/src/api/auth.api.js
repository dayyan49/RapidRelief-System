import api from "./axios.js";

export const registerUser = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};