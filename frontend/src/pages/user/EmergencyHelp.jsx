import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Phone } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Button from "../../components/common/Button.jsx";
import { createIncident } from "../../api/incident.api.js";
import useAuth from "../../hooks/useAuth.js";
import useToast from "../../hooks/useToast.js";

const EmergencyHelp = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendSOS = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await createIncident({
            lat: pos.coords.latitude, lon: pos.coords.longitude,
            severity: 10, disasterType: "OTHER",
            description: "EMERGENCY SOS - Immediate help required", affectedPopulation: 1,
          });
          if (res.success) {
            setSent(true);
            toast("SOS sent! Rescue teams notified.", "success");
            if (isAuthenticated) setTimeout(() => navigate("/tracking"), 2000);
          }
        } catch (err) {
          toast(err.toastMessage || "SOS failed", "error");
        } finally {
          setLoading(false);
        }
      },
      () => { toast("Enable GPS for SOS", "error"); setLoading(false); }
    );
  };

  return (
    <DashboardLayout title="Emergency SOS" subtitle="One-tap immediate help request">
      <div className="max-w-lg mx-auto">
        <div className="glass-card p-10 text-center border-red-500/20">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/15 flex items-center justify-center animate-pulse">
            <Heart size={40} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Emergency Help Request</h2>
          <p className="text-slate-400 text-sm mb-8">Sends your GPS location instantly to rescue dispatch</p>
          {sent ? (
            <p className="text-green-400 font-medium text-lg">SOS Transmitted!</p>
          ) : (
            <Button variant="danger" size="lg" className="w-full rounded-full h-14 text-lg" onClick={sendSOS} loading={loading}>
              SEND SOS
            </Button>
          )}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Phone size={14} /> Also call <strong className="text-white">112</strong> for life-threatening emergencies
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmergencyHelp;
