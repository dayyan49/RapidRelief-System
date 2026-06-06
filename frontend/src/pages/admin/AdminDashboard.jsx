import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Users, CheckCircle, Clock, Package } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import DashboardCard from "../../components/common/DashboardCard.jsx";
import AIPredictionPanel from "../../components/common/AIPredictionPanel.jsx";
import { getAllIncidents } from "../../api/incident.api.js";
import { getPendingRescues } from "../../api/admin.api.js";
import { getInventorySummary } from "../../api/inventory.api.js";
import { onSocketEvent, offSocketEvent } from "../../services/socket.service.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, rescues: 0, resources: 0 });
  const [latestPrediction, setLatestPrediction] = useState(null);

  const fetchStats = async () => {
    try {
      const [inc, rescue, inv] = await Promise.all([getAllIncidents(), getPendingRescues(), getInventorySummary()]);
      const incidents = inc.incidents || [];
      const withMl = incidents.find((i) => i.mlPredictions);
      if (withMl?.mlPredictions) setLatestPrediction(withMl.mlPredictions);

      setStats({
        total: incidents.length,
        active: incidents.filter((i) => ["PENDING", "ASSIGNED", "IN_PROGRESS"].includes(i.status)).length,
        completed: incidents.filter((i) => i.status === "COMPLETED").length,
        rescues: (rescue.users || []).length,
        resources: Object.values(inv.summary || {}).reduce((a, b) => a + (b.available || 0), 0),
      });
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchStats();
    onSocketEvent("adminUpdate", fetchStats);
    return () => offSocketEvent("adminUpdate", fetchStats);
  }, []);

  return (
    <DashboardLayout title="Admin Command Center" subtitle="Disaster response oversight and resource management">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <DashboardCard title="Total Incidents" value={stats.total} icon={AlertTriangle} color="red" to="/admin/incidents" />
        <DashboardCard title="Active Incidents" value={stats.active} icon={Clock} color="orange" to="/admin/incidents" />
        <DashboardCard title="Completed" value={stats.completed} icon={CheckCircle} color="green" to="/admin/incidents" />
        <DashboardCard title="Pending Rescues" value={stats.rescues} icon={Users} color="blue" to="/admin/pending-rescues" />
        <DashboardCard title="Available Resources" value={stats.resources} icon={Package} color="teal" to="/admin/inventory" />
      </div>

      <div className="mb-8">
        <AIPredictionPanel predictions={latestPrediction} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Manage Incidents", desc: "Review and assign rescue teams", to: "/admin/incidents" },
          { title: "Approve Volunteers", desc: "Verify rescue personnel", to: "/admin/pending-rescues" },
          { title: "Resource Inventory", desc: "Manage ambulances, kits, food", to: "/admin/inventory" },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="glass-card p-5 hover:border-teal-500/30 transition">
            <h3 className="text-white font-semibold">{item.title}</h3>
            <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
