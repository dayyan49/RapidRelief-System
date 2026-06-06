import { useEffect, useState } from "react";
import { onSocketEvent, offSocketEvent } from "../services/socket.service.js";
import useToast from "./useToast.js";
import useAuth from "./useAuth.js";

const useNotifications = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const push = (item) => {
    setNotifications((prev) => [item, ...prev].slice(0, 20));
    toast(item.message, item.type || "info");
  };

  useEffect(() => {
    if (!user?.id) return;

    const handlers = {
      newAssignment: (data) =>
        push({ id: Date.now(), message: "New rescue task assigned!", type: "success", data, time: new Date() }),
      statusUpdate: (data) =>
        push({ id: Date.now(), message: `Status updated: ${data.status}`, type: "info", data, time: new Date() }),
      adminUpdate: (data) =>
        push({ id: Date.now(), message: `Admin alert: ${data.type?.replace("_", " ")}`, type: "warning", data, time: new Date() }),
      locationUpdate: () =>
        push({ id: Date.now(), message: "Rescue team location updated", type: "info", time: new Date() }),
    };

    Object.entries(handlers).forEach(([event, handler]) => onSocketEvent(event, handler));
    return () => Object.entries(handlers).forEach(([event, handler]) => offSocketEvent(event, handler));
  }, [user?.id]);

  const clearAll = () => setNotifications([]);

  return { notifications, clearAll };
};

export default useNotifications;
