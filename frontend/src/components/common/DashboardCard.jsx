import { Link } from "react-router-dom";

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "teal",
  to,
  onClick,
  className = "",
}) => {
  const colors = {
    teal: "from-teal-500/20 to-teal-600/5 border-teal-500/20 text-teal-400",
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
    orange: "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-400",
    red: "from-red-500/20 to-red-600/5 border-red-500/20 text-red-400",
    green: "from-green-500/20 to-green-600/5 border-green-500/20 text-green-400",
  };

  const inner = (
    <div className={`glass-card p-5 bg-gradient-to-br ${colors[color]} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-slate-900/50 ${colors[color].split(" ").pop()}`}>
          {Icon && <Icon size={22} />}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend > 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-white/90 font-medium text-sm">{title}</p>
      {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  if (to) return <Link to={to}>{inner}</Link>;
  if (onClick) return <button type="button" onClick={onClick} className="w-full text-left">{inner}</button>;
  return inner;
};

export default DashboardCard;
