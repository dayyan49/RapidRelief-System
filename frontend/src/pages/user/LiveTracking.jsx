import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import IncidentMap from "../../components/maps/IncidentMap.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import StatusTimeline from "../../components/common/StatusTimeline.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getMyIncidents } from "../../api/incident.api.js";
import { onSocketEvent, offSocketEvent } from "../../services/socket.service.js";

const LiveTracking = () => {
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rescueLoc, setRescueLoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = () => {
    getMyIncidents().then((res) => {
      const active = (res.incidents || []).filter((i) => i.status !== "COMPLETED");
      setIncidents(active);
      if (active.length && !selected) {
        setSelected(active[0]);
        const loc = active[0].assignment?.rescueId?.location?.current;
        if (loc?.lat) setRescueLoc(loc);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchIncidents();
    const locHandler = (data) => {
      if (!selected || data.incidentId === selected._id) setRescueLoc({ lat: data.lat, lon: data.lon });
      fetchIncidents();
    };
    onSocketEvent("statusUpdate", fetchIncidents);
    onSocketEvent("locationUpdate", locHandler);
    return () => { offSocketEvent("statusUpdate", fetchIncidents); offSocketEvent("locationUpdate", locHandler); };
  }, [selected?._id]);

  if (loading) return <DashboardLayout title="Live Tracking"><Loader /></DashboardLayout>;

  const markers = [];
  if (selected) markers.push({ lat: selected.location.lat, lon: selected.location.lon, label: "Incident", type: "incident", status: selected.status });
  if (rescueLoc?.lat) markers.push({ lat: rescueLoc.lat, lon: rescueLoc.lon, label: "Rescue Team", type: "rescue" });

  const route = selected && rescueLoc ? [selected.location, rescueLoc] : [];

  return (
    <DashboardLayout title="Live Tracking" subtitle="Real-time rescue operation monitoring">
      {incidents.length === 0 ? (
        <div className="glass-card p-12 text-center text-slate-400">No active operations to track</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2">
              {incidents.map((inc) => (
                <button key={inc._id} onClick={() => { setSelected(inc); setRescueLoc(inc.assignment?.rescueId?.location?.current || null); }}
                  className={`px-4 py-2 rounded-xl text-sm border transition ${selected?._id === inc._id ? "bg-teal-500/15 border-teal-500/30 text-teal-300" : "border-white/10 text-slate-400"}`}>
                  {inc.disasterType}
                </button>
              ))}
            </div>
            <IncidentMap center={rescueLoc?.lat ? [rescueLoc.lat, rescueLoc.lon] : [selected.location.lat, selected.location.lon]}
              markers={markers} route={route} height="400px" zoom={14} />
          </div>
          {selected && (
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{selected.disasterType}</h3>
                <StatusBadge status={selected.status} />
              </div>
              <p className="text-slate-400 text-sm">{selected.description}</p>
              {selected.assignment && (
                <p className="text-teal-300 text-sm">Rescue: {selected.assignment.rescueId?.name}</p>
              )}
              <StatusTimeline currentStatus={selected.status} />
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default LiveTracking;
