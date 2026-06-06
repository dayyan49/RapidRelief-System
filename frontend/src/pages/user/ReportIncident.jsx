import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, MapPin, CheckCircle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import IncidentMap from "../../components/maps/IncidentMap.jsx";
import Button from "../../components/common/Button.jsx";
import { createIncident } from "../../api/incident.api.js";
import { DISASTER_TYPES } from "../../utils/constants.js";
import useToast from "../../hooks/useToast.js";
import useAuth from "../../hooks/useAuth.js";

const ReportForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.209 });
  const [form, setForm] = useState({
    severity: 5, disasterType: "FLOOD", description: "", affectedPopulation: 1,
  });

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }); toast("Location captured", "success"); },
      () => toast("Could not get GPS location", "error")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createIncident({ ...form, ...location });
      if (res.success) {
        toast("Incident reported successfully", "success");
        onSuccess(res.incident);
      }
    } catch (err) {
      toast(err.toastMessage || "Failed to report", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="glass-card p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-300 mb-1.5 block">Disaster Type</label>
            <select value={form.disasterType} onChange={(e) => setForm({ ...form, disasterType: e.target.value })}
              className="w-full h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white">
              {DISASTER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-300 mb-1.5 block">Affected Population</label>
            <input type="number" min="1" value={form.affectedPopulation}
              onChange={(e) => setForm({ ...form, affectedPopulation: Number(e.target.value) })}
              className="w-full h-11 px-4 rounded-xl bg-slate-800 border border-slate-700 text-white" />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-300 mb-1.5 block">Severity: {form.severity}/10</label>
          <input type="range" min="1" max="10" value={form.severity}
            onChange={(e) => setForm({ ...form, severity: Number(e.target.value) })}
            className="w-full accent-teal-500" />
        </div>

        <div>
          <label className="text-sm text-slate-300 mb-1.5 block">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4} placeholder="Describe the situation, damages, and immediate needs..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none" required />
        </div>

        <div>
          <label className="text-sm text-slate-300 mb-1.5 block">Upload Image (optional)</label>
          <label className="flex items-center gap-3 p-4 border border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-teal-500/50 transition">
            <Upload size={20} className="text-slate-400" />
            <span className="text-sm text-slate-400">{imageName || "Choose image file"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageName(e.target.files?.[0]?.name || "")} />
          </label>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2"><MapPin size={16} /> Location</label>
          <button type="button" onClick={getLocation} className="text-sm text-teal-400 hover:text-teal-300">Use My GPS</button>
        </div>
        <IncidentMap center={[location.lat, location.lon]}
          markers={[{ lat: location.lat, lon: location.lon, label: "Incident", type: "incident" }]} height="280px" />
        <p className="text-xs text-slate-500 mt-2">{location.lat.toFixed(4)}, {location.lon.toFixed(4)}</p>
      </div>

      <Button type="submit" size="lg" className="w-full" loading={loading}>Submit Report</Button>
    </form>
  );
};

const ReportIncident = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const handleSuccess = (incident) => {
    if (isAuthenticated) {
      navigate("/my-requests");
    } else {
      setSubmitted(incident);
    }
  };

  const content = submitted ? (
    <div className="max-w-lg mx-auto glass-card p-8 text-center animate-slide-up">
      <CheckCircle size={48} className="text-teal-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">Report Submitted</h2>
      <p className="text-slate-400 text-sm mb-6">
        Your incident has been logged. Emergency coordinators have been notified and will dispatch help as needed.
      </p>
      {submitted._id && (
        <p className="text-xs text-slate-500 mb-6">Reference ID: <span className="text-slate-300 font-mono">{submitted._id}</span></p>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        <Link to="/register"><Button>Create Account to Track</Button></Link>
      </div>
    </div>
  ) : (
    <ReportForm onSuccess={handleSuccess} />
  );

  if (isAuthenticated) {
    return (
      <DashboardLayout title="Report Incident" subtitle="Provide details to coordinate emergency response">
        {content}
      </DashboardLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Report an Incident</h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            No account required — submit details so rescue teams can respond quickly.
          </p>
        </div>
        {content}
      </div>
    </PublicLayout>
  );
};

export default ReportIncident;
