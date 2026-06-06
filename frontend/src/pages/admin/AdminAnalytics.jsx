import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getAllIncidents } from "../../api/incident.api.js";
import { getInventorySummary } from "../../api/inventory.api.js";
import { DISASTER_TYPES } from "../../utils/constants.js";

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    Promise.all([getAllIncidents(), getInventorySummary()])
      .then(([inc, inv]) => {
        setIncidents(inc.incidents || []);
        setInventory(inv.summary || {});
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardLayout title="Analytics"><Loader /></DashboardLayout>;

  const byType = DISASTER_TYPES.map((type) => ({
    type,
    count: incidents.filter((i) => i.disasterType === type).length,
  })).filter((t) => t.count > 0);

  const maxCount = Math.max(...byType.map((t) => t.count), 1);
  const avgSeverity = incidents.length
    ? (incidents.reduce((a, i) => a + i.severity, 0) / incidents.length).toFixed(1)
    : 0;

  const statusBreakdown = ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED"].map((s) => ({
    status: s,
    count: incidents.filter((i) => i.status === s).length,
  }));

  return (
    <DashboardLayout title="Analytics" subtitle="Incident trends, resource usage, and response metrics">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold text-white">{incidents.length}</p>
          <p className="text-slate-400 text-sm">Total Incidents</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold text-teal-400">{avgSeverity}</p>
          <p className="text-slate-400 text-sm">Avg Severity</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold text-green-400">
            {incidents.filter((i) => i.status === "COMPLETED").length}
          </p>
          <p className="text-slate-400 text-sm">Resolved</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Incident Trends by Type</h3>
          <div className="space-y-3">
            {byType.map((t) => (
              <div key={t.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{t.type}</span>
                  <span className="text-slate-500">{t.count}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${(t.count / maxCount) * 100}%` }} />
                </div>
              </div>
            ))}
            {byType.length === 0 && <p className="text-slate-500 text-sm">No incident data yet</p>}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Status Breakdown</h3>
          <div className="space-y-3">
            {statusBreakdown.map((s) => (
              <div key={s.status} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-300 text-sm">{s.status.replace("_", " ")}</span>
                <span className="text-white font-medium">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="font-semibold text-white mb-4">Resource Usage</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(inventory).map(([type, data]) => (
              <div key={type} className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{data.available}</p>
                <p className="text-xs text-slate-400 mt-1">{type.replace("_", " ")}</p>
                <p className="text-[10px] text-slate-500">{data.total} total</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
