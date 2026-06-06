import api from "./axios.js";

export const getInventory = async (type) => {
  const response = await api.get("/admin/inventory", { params: type ? { type } : {} });
  return response.data;
};

export const getInventorySummary = async () => {
  const response = await api.get("/admin/inventory/summary");
  return response.data;
};

export const createResource = async (data) => {
  const response = await api.post("/admin/inventory", data);
  return response.data;
};

export const updateResource = async (id, data) => {
  const response = await api.patch(`/admin/inventory/${id}`, data);
  return response.data;
};

export const deleteResource = async (id) => {
  const response = await api.delete(`/admin/inventory/${id}`);
  return response.data;
};
