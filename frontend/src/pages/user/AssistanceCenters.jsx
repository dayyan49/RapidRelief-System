import { useEffect, useState } from "react";
import { MapPin, Phone, Shield } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import IncidentMap from "../../components/maps/IncidentMap.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getNearbyCenters } from "../../api/centers.api.js";

const AssistanceCenters = () => {
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.209 });
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = (lat, lon) => {
      getNearbyCenters(lat, lon).then((res) => setCenters(res.centers || [])).finally(() => setLoading(false));
    };
    navigator.geolocation.getCurrentPosition(
      (pos) => { const l = { lat: pos.coords.latitude, lon: pos.coords.longitude }; setLocation(l); fetch(l.lat, l.lon); },
      () => fetch(location.lat, location.lon)
    );
  }, []);

  const markers = centers.map((c) => ({
    id: c.id, lat: c.lat, lon: c.lon, label: c.name, type: "shelter",
    description: `${c.type} — ${c.distance?.toFixed(1)} km`,
  }));

  return (
    <DashboardLayout title="Safe Zones & Shelters" subtitle="Nearby assistance centers and emergency shelters">
      <IncidentMap center={[location.lat, location.lon]} markers={markers} showUserLocation height="320px" />
      {loading ? <Loader text="Finding nearest centers..." /> : (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {centers.map((c) => (
            <div key={c.id} className="glass-card p-5 flex justify-between gap-4">
              <div>
                <h3 className="text-white font-medium flex items-center gap-2"><Shield size={16} className="text-teal-400" />{c.name}</h3>
                <p className="text-teal-400/80 text-sm">{c.type}</p>
                <p className="text-slate-500 text-xs mt-1 flex items-center gap-1"><MapPin size={12} />{c.distance?.toFixed(1)} km</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-slate-400">Capacity: {c.capacity}</p>
                <p className="text-slate-300 flex items-center gap-1 justify-end mt-1"><Phone size={12} />{c.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AssistanceCenters;
