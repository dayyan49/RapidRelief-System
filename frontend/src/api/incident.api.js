import api from "./axios.js";

export const createIncident = async (data) => {
  const response = await api.post("/incidents/create", data);
  return response.data;
};

export const getAllIncidents = async () => {
  const response = await api.get("/incidents/all");
  return response.data;
};

export const getMyIncidents = async () => {
  const response = await api.get("/incidents/mine");
  return response.data;
};
