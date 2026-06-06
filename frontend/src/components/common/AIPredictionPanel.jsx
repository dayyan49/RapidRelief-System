import { Brain, Users, Ambulance, Package, HeartPulse } from "lucide-react";

const AIPredictionPanel = ({ predictions, loading }) => {
  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 bg-slate-700 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!predictions) return null;

  const items = [
    { label: "Teams Required", value: predictions.teamsRequired, icon: Users, color: "text-blue-400" },
    { label: "Ambulances", value: predictions.ambulancesRequired, icon: Ambulance, color: "text-red-400" },
    { label: "Medical Kits", value: predictions.medicalKitsRequired, icon: HeartPulse, color: "text-green-400" },
    { label: "Food Packets", value: predictions.foodPacketsRequired, icon: Package, color: "text-orange-400" },
  ];

  return (
    <div className="glass-card p-6 border-teal-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain size={20} className="text-teal-400" />
        <h3 className="font-semibold text-white">AI Resource Prediction</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
              <Icon size={18} className={`${item.color} mb-2`} />
              <p className="text-2xl font-bold text-white">{item.value ?? "—"}</p>
              <p className="text-xs text-slate-400 mt-1">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIPredictionPanel;
