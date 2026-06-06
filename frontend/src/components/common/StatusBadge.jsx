import { STATUS_COLORS } from "../../utils/constants.js";

const StatusBadge = ({ status }) => {
  const color = STATUS_COLORS[status] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {status?.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
