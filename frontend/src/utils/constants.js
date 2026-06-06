export const DISASTER_TYPES = [
  "FLOOD", "EARTHQUAKE", "FIRE", "LANDSLIDE", "CYCLONE", "STORM", "OTHER",
];

export const INCIDENT_STATUS = {
  PENDING: "PENDING", ASSIGNED: "ASSIGNED", IN_PROGRESS: "IN_PROGRESS", COMPLETED: "COMPLETED",
};

export const ASSIGNMENT_STATUS = {
  ASSIGNED: "ASSIGNED", EN_ROUTE: "EN_ROUTE", COMPLETED: "COMPLETED",
};

export const STATUS_COLORS = {
  PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  ASSIGNED: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  IN_PROGRESS: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  COMPLETED: "bg-green-500/20 text-green-300 border-green-500/30",
  EN_ROUTE: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export const ROLE_DASHBOARD = {
  USER: "/citizen/dashboard",
  RESCUE: "/rescue/dashboard",
  ADMIN: "/admin/dashboard",
};
