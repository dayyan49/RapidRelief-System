import { CheckCircle, Circle, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const STEPS = ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED"];

const StatusTimeline = ({ currentStatus }) => {
  const currentIdx = STEPS.indexOf(currentStatus);

  return (
    <div className="space-y-0">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              {done ? (
                <CheckCircle size={20} className={active ? "text-teal-400" : "text-green-500"} />
              ) : (
                <Circle size={20} className="text-slate-600" />
              )}
              {i < STEPS.length - 1 && (
                <div className={`w-0.5 h-8 my-1 ${done ? "bg-teal-500/50" : "bg-slate-700"}`} />
              )}
            </div>
            <div className="pb-6">
              <div className="flex items-center gap-2">
                <StatusBadge status={step} />
                {active && <Clock size={14} className="text-teal-400" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {step === "PENDING" && "Incident reported"}
                {step === "ASSIGNED" && "Rescue team assigned"}
                {step === "IN_PROGRESS" && "Rescue en route"}
                {step === "COMPLETED" && "Mission completed"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
