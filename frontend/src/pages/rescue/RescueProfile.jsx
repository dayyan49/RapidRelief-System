import { Upload, CheckCircle, Clock, XCircle } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Button from "../../components/common/Button.jsx";
import useAuth from "../../hooks/useAuth.js";
import { uploadDocument } from "../../api/rescue.api.js";
import useToast from "../../hooks/useToast.js";
import { useState } from "react";

const RescueProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const verificationStatus = user?.role === "RESCUE" ? "verified" : user?.rescueApplicationStatus === "PENDING" ? "pending" : "none";

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadDocument(file, "ID_PROOF");
      toast("Document uploaded", "success");
    } catch (err) {
      toast(err.toastMessage || "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout title="Rescue Profile" subtitle="Manage your volunteer credentials">
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div><p className="text-slate-500">Name</p><p className="text-white">{user?.name || "—"}</p></div>
            <div><p className="text-slate-500">Email</p><p className="text-white">{user?.email || "—"}</p></div>
            <div><p className="text-slate-500">Phone</p><p className="text-white">{user?.phoneNumber || "—"}</p></div>
            <div><p className="text-slate-500">Role</p><p className="text-teal-400">{user?.role}</p></div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Verification Status</h3>
          <div className="flex items-center gap-3">
            {verificationStatus === "verified" && <><CheckCircle className="text-green-400" /><span className="text-green-400">Verified Rescue Personnel</span></>}
            {verificationStatus === "pending" && <><Clock className="text-yellow-400" /><span className="text-yellow-400">Pending Admin Approval</span></>}
            {verificationStatus === "none" && <><XCircle className="text-slate-500" /><span className="text-slate-400">Not yet applied</span></>}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Upload Documents</h3>
          <label className="flex items-center justify-center gap-2 p-6 border border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-teal-500/50 transition">
            <Upload size={20} className="text-slate-400" />
            <span className="text-sm text-slate-400">{uploading ? "Uploading..." : "Upload ID Proof or Certificate"}</span>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-2">Availability</h3>
          <p className="text-slate-400 text-sm">Set your availability status from the tasks page when on active duty.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RescueProfile;
