import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Button from "../../components/common/Button.jsx";
import AIPredictionPanel from "../../components/common/AIPredictionPanel.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getAllIncidents } from "../../api/incident.api.js";
import { assignRescue } from "../../api/assignment.api.js";
import { onSocketEvent, offSocketEvent } from "../../services/socket.service.js";
import useToast from "../../hooks/useToast.js";

const AdminIncidents = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const fetchIncidents = () => {
    getAllIncidents().then((res) => setIncidents(res.incidents || [])).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchIncidents();
    onSocketEvent("adminUpdate", fetchIncidents);
    return () => offSocketEvent("adminUpdate", fetchIncidents);
  }, []);

  const handleAssign = async (id) => {
    setAssigning(id);
    try {
      const res = await assignRescue(id);
      if (res.mlPredictions) setPrediction(res.mlPredictions);
      toast("ML allocation complete", "success");
      fetchIncidents();
    } catch (err) {
      toast(err.toastMessage || "Assignment failed", "error");
    } finally {
      setAssigning(null);
    }
  };

  return (
    <DashboardLayout title="Manage Incidents" subtitle="Review, assign rescue teams, and monitor status">
      {prediction && <div className="mb-6"><AIPredictionPanel predictions={prediction} /></div>}
      {loading ? <Loader /> : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-white/10 bg-slate-900/50">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Severity</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Reporter</th>
                  <th className="text-left py-3 px-4">ML Resources</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc._id} className="border-b border-white/5 text-slate-300 hover:bg-white/5 transition">
                    <td className="py-3 px-4 font-medium text-white">{inc.disasterType}</td>
                    <td className="py-3 px-4">{inc.severity}/10</td>
                    <td className="py-3 px-4"><StatusBadge status={inc.status} /></td>
                    <td className="py-3 px-4">{inc.userId?.name || "Guest"}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">
                      {inc.mlPredictions ? `T:${inc.mlPredictions.teamsRequired} A:${inc.mlPredictions.ambulancesRequired}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      {inc.status === "PENDING" && (
                        <Button size="sm" onClick={() => handleAssign(inc._id)} loading={assigning === inc._id}>ML Assign</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminIncidents;
