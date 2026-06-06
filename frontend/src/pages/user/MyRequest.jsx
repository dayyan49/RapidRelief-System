import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getMyIncidents } from "../../api/incident.api.js";

const MyRequest = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyIncidents().then((res) => setIncidents(res.incidents || [])).finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="My Requests" subtitle="Track all your reported incidents">
      {loading ? <Loader /> : incidents.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <ClipboardList className="mx-auto text-slate-600 mb-3" size={40} />
          <p className="text-slate-400">No requests yet</p>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {incidents.map((inc) => (
            <div key={inc._id} className="glass-card p-5">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <h3 className="text-white font-medium">{inc.disasterType}</h3>
                <StatusBadge status={inc.status} />
              </div>
              <p className="text-slate-400 text-sm mb-3">{inc.description || "No description"}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span>Severity: {inc.severity}/10</span>
                <span>Population: {inc.affectedPopulation}</span>
              </div>
              {inc.assignment && (
                <p className="text-teal-300 text-sm mt-3 pt-3 border-t border-white/10">
                  Rescue: {inc.assignment.rescueId?.name} — <StatusBadge status={inc.assignment.status} />
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyRequest;
