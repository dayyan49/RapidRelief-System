import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import IncidentMap from "../../components/maps/IncidentMap.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getMyTasks, updateLocation } from "../../api/rescue.api.js";

const RescueMap = () => {
  const [tasks, setTasks] = useState([]);
  const [myLoc, setMyLoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTasks().then((res) => setTasks((res.tasks || []).filter((t) => t.status !== "COMPLETED")))
      .finally(() => setLoading(false));

    navigator.geolocation?.watchPosition((pos) => {
      const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      setMyLoc(loc);
      updateLocation(loc.lat, loc.lon).catch(() => {});
    });
  }, []);

  if (loading) return <DashboardLayout title="Live Map"><Loader /></DashboardLayout>;

  const markers = tasks.map((t) => ({
    id: t._id,
    lat: t.incidentId?.location?.lat,
    lon: t.incidentId?.location?.lon,
    label: t.incidentId?.disasterType,
    type: "incident",
    status: t.status,
    description: `Severity ${t.incidentId?.severity}/10`,
  })).filter((m) => m.lat);

  if (myLoc) markers.push({ lat: myLoc.lat, lon: myLoc.lon, label: "You", type: "rescue" });

  const center = myLoc ? [myLoc.lat, myLoc.lon] : markers[0] ? [markers[0].lat, markers[0].lon] : [28.6139, 77.209];

  return (
    <DashboardLayout title="Live Operations Map" subtitle="Incident locations and navigation assistance">
      <div className="glass-card p-4 mb-4 flex flex-wrap gap-4 text-sm">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500" /> Incidents ({markers.filter((m) => m.type === "incident").length})</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /> Your Position</span>
      </div>
      <IncidentMap center={center} markers={markers} height="500px" zoom={12} showUserLocation={!!myLoc} />
    </DashboardLayout>
  );
};

export default RescueMap;
