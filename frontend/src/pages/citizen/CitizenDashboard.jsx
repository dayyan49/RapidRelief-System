import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, AlertTriangle, Shield, Phone, MapPin, Heart, FileText } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import DashboardCard from "../../components/common/DashboardCard.jsx";
import Button from "../../components/common/Button.jsx";
import useAuth from "../../hooks/useAuth.js";
import { getMyIncidents } from "../../api/incident.api.js";
import { getNearbyCenters } from "../../api/centers.api.js";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ requests: 0, active: 0, shelters: 0 });

  useEffect(() => {
    getMyIncidents().then((res) => {
      const inc = res.incidents || [];
      setStats((s) => ({
        ...s,
        requests: inc.length,
        active: inc.filter((i) => i.status !== "COMPLETED").length,
      }));
    }).catch(() => {});
    navigator.geolocation?.getCurrentPosition((pos) => {
      getNearbyCenters(pos.coords.latitude, pos.coords.longitude)
        .then((res) => setStats((s) => ({ ...s, shelters: (res.centers || []).length })))
        .catch(() => {});
    });
  }, []);

  const quickActions = [
    { label: "Report Disaster", to: "/report", icon: AlertTriangle, color: "red" },
    { label: "Request Help", to: "/emergency", icon: Heart, color: "orange" },
    { label: "Track Rescue", to: "/tracking", icon: MapPin, color: "blue" },
    { label: "View Safe Zones", to: "/centers", icon: Shield, color: "teal" },
  ];

  return (
    <DashboardLayout title={`Welcome, ${user?.name || "Citizen"}`} subtitle="Your emergency response command center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="My Requests" value={stats.requests} icon={ClipboardList} color="teal" to="/my-requests" />
        <DashboardCard title="Active Emergencies" value={stats.active} icon={AlertTriangle} color="red" to="/tracking" />
        <DashboardCard title="Nearby Shelters" value={stats.shelters} icon={Shield} color="blue" to="/centers" />
        <DashboardCard title="Emergency" value="112" subtitle="Disaster Helpline" icon={Phone} color="orange" />
      </div>

      <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <Link key={a.to} to={a.to} className="glass-card p-5 hover:border-teal-500/30 transition group">
              <Icon size={24} className="text-teal-400 mb-3 group-hover:scale-110 transition" />
              <p className="text-white font-medium text-sm">{a.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="glass-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2"><FileText size={18} className="text-teal-400" /> Become a Rescue Volunteer</h3>
          <p className="text-slate-400 text-sm mt-1">Help your community during disasters</p>
        </div>
        <Link to="/volunteer"><Button>Apply Now</Button></Link>
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
