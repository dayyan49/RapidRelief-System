import axios from "axios";
import { ENV } from "../config/env.js";

export const callPythonService = async (payload) => {
  const response = await axios.post(
    `${ENV.PYTHON_SERVICE_URL}/allocate`,
    payload,
    { timeout: 8000 }
  );
  return response.data?.data || response.data;
};

export const callNearbyCenters = async (payload) => {
  const response = await axios.post(
    `${ENV.PYTHON_SERVICE_URL}/nearby-centers`,
    payload,
    { timeout: 8000 }
  );
  return response.data?.data || response.data;
};
