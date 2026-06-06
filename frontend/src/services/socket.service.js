import { io } from "socket.io-client";
import { getToken } from "../utils/token.js";

let socket = null;

export const connectSocket = (userId) => {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token: getToken() },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    if (userId) {
      socket.emit("joinRoom", userId);
    }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const onSocketEvent = (event, callback) => {
  if (!socket) return;
  socket.on(event, callback);
};

export const offSocketEvent = (event, callback) => {
  if (!socket) return;
  socket.off(event, callback);
};
