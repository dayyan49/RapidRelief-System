import api from "./axios.js";

export const assignRescue = async (incidentId) => {
  const response = await api.post("/assignment/assign", { incidentId });
  return response.data;
};

export const updateTaskStatus = async (assignmentId, status) => {
  const response = await api.patch("/assignment/status", { assignmentId, status });
  return response.data;
};
