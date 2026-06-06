import { getIO } from "../config/socket.js";

export const notifyAssignment = (userId, data) => {
  const io = getIO();
  io.to(userId.toString()).emit("newAssignment", data);
};

export const notifyStatusUpdate = (userId, data) => {
  const io = getIO();
  io.to(userId.toString()).emit("statusUpdate", data);
};

export const notifyAdmins = (data) => {
  const io = getIO();
  io.emit("adminUpdate", data);
};

export const notifyLocationUpdate = (userId, data) => {
  const io = getIO();
  io.to(userId.toString()).emit("locationUpdate", data);
};
