import api from "./axios.js";

export const getPendingRescues = async () => {
  const response = await api.get("/admin/pendingRescue");
  return response.data;
};

export const approveRescue = async (userId) => {
  const response = await api.patch(`/admin/approve/${userId}`);
  return response.data;
};
