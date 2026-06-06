import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const createIcon = (color, label = "") =>
  L.divIcon({
    className: "",
    html: `<div style="position:relative">
      <div style="background:${color};width:16px;height:16px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>
      ${label ? `<span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);background:#0f172a;color:white;font-size:10px;padding:2px 6px;border-radius:4px;white-space:nowrap">${label}</span>` : ""}
    </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const ICONS = {
  incident: createIcon("#ef4444"),
  rescue: createIcon("#3b82f6", "Rescue"),
  shelter: createIcon("#14b8a6", "Shelter"),
  safe: createIcon("#22c55e"),
  user: createIcon("#a78bfa"),
};

const MapRecenter = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, zoom || map.getZoom());
  }, [center, zoom, map]);
  return null;
};

const IncidentMap = ({
  center = [28.6139, 77.209],
  zoom = 13,
  markers = [],
  route = [],
  height = "400px",
  showUserLocation = false,
}) => {
  const routeCoords = route.length > 1 ? route.map((p) => [p.lat, p.lon]) : [];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl" style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapRecenter center={center} zoom={zoom} />
        {showUserLocation && (
          <Marker position={center} icon={ICONS.user}>
            <Popup><strong>Your Location</strong></Popup>
          </Marker>
        )}
        {routeCoords.length > 1 && (
          <Polyline positions={routeCoords} color="#14b8a6" weight={3} dashArray="8 8" opacity={0.8} />
        )}
        {markers.map((m, i) => (
          <Marker
            key={m.id || i}
            position={[m.lat, m.lon]}
            icon={ICONS[m.type] || ICONS.incident}
          >
            <Popup>
              <div className="text-sm">
                <strong>{m.label}</strong>
                {m.status && <p className="mt-1 text-xs">Status: {m.status}</p>}
                {m.description && <p className="mt-1 text-xs text-gray-600">{m.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IncidentMap;
