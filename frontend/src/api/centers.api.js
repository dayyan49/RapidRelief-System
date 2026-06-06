import api from "./axios.js";

export const getNearbyCenters = async (lat, lon, limit = 5) => {
  const response = await api.get("/centers/nearby", {
    params: { lat, lon, limit },
  });
  return response.data;
};
