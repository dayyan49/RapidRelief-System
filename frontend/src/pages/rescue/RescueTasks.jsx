import { useEffect, useState, useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Button from "../../components/common/Button.jsx";
import AIPredictionPanel from "../../components/common/AIPredictionPanel.jsx";
import IncidentMap from "../../components/maps/IncidentMap.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getMyTasks, updateLocation } from "../../api/rescue.api.js";
import { updateTaskStatus } from "../../api/assignment.api.js";
import { onSocketEvent, offSocketEvent } from "../../services/socket.service.js";
import { ASSIGNMENT_STATUS } from "../../utils/constants.js";
import useToast from "../../hooks/useToast.js";

const RescueTasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const interval = useRef(null);

  const fetchTasks = () => {
    getMyTasks().then((res) => setTasks(res.tasks || [])).catch(() => {}).finally(() => setLoading(false));
  };

  const shareLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude).catch(() => {});
    });
  };

  useEffect(() => {
    fetchTasks();
    shareLocation();
    interval.current = setInterval(shareLocation, 30000);
    onSocketEvent("newAssignment", fetchTasks);
    return () => { clearInterval(interval.current); offSocketEvent("newAssignment", fetchTasks); };
  }, []);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      await updateTaskStatus(id, status);
      toast("Status updated", "success");
      fetchTasks();
    } catch (err) {
      toast(err.toastMessage || "Update failed", "error");
    } finally {
      setUpdating(null);
    }
  };

  const next = { ASSIGNED: ASSIGNMENT_STATUS.EN_ROUTE, EN_ROUTE: ASSIGNMENT_STATUS.COMPLETED };

  if (loading) return <DashboardLayout title="My Tasks"><Loader /></DashboardLayout>;

  return (
    <DashboardLayout title="Task Management" subtitle="Assigned incidents and mission updates">
      {tasks.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-400">No tasks assigned yet</div>
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => {
            const inc = task.incidentId;
            if (!inc) return null;
            const n = next[task.status];
            const priority = inc.severity >= 8 ? "HIGH" : inc.severity >= 5 ? "MEDIUM" : "LOW";
            const priorityColor = { HIGH: "text-red-400 bg-red-500/10", MEDIUM: "text-orange-400 bg-orange-500/10", LOW: "text-green-400 bg-green-500/10" };

            return (
              <div key={task._id} className="glass-card overflow-hidden">
                <div className="p-5 border-b border-white/10 flex flex-wrap justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{inc.disasterType}</h3>
                      <StatusBadge status={task.status} />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[priority]}`}>{priority}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Severity {inc.severity}/10 · Pop. {inc.affectedPopulation}</p>
                  </div>
                  {n && (
                    <Button onClick={() => handleStatus(task._id, n)} loading={updating === task._id} size="sm">
                      {n === "EN_ROUTE" ? "Mark En Route" : "Complete Mission"}
                    </Button>
                  )}
                </div>
                <div className="grid lg:grid-cols-2">
                  <IncidentMap center={[inc.location.lat, inc.location.lon]}
                    markers={[{ lat: inc.location.lat, lon: inc.location.lon, label: inc.disasterType, type: "incident" }]} height="220px" />
                  <div className="p-5 space-y-3">
                    <p className="text-slate-300 text-sm">{inc.description || "No description"}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> {inc.location.lat.toFixed(4)}, {inc.location.lon.toFixed(4)}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><Phone size={12} /> Contact via dispatch</p>
                    {inc.mlPredictions && <AIPredictionPanel predictions={inc.mlPredictions} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default RescueTasks;
