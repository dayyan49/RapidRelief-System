import api from "./axios.js";

export const applyForRescue = async (skills) => {
  const response = await api.post("/rescue/apply", { skills });
  return response.data;
};

export const getMyTasks = async () => {
  const response = await api.get("/rescue/tasks");
  return response.data;
};

export const uploadDocument = async (file, type = "ID_PROOF") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  const response = await api.post("/rescue/upload-document", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateLocation = async (lat, lon) => {
  const response = await api.patch("/rescue/location", { lat, lon });
  return response.data;
};
