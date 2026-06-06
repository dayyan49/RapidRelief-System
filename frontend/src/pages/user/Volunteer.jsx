import { useState } from "react";
import { Upload } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Button from "../../components/common/Button.jsx";
import { applyForRescue, uploadDocument } from "../../api/rescue.api.js";
import useAuth from "../../hooks/useAuth.js";

const SKILL_OPTIONS = [
  "First Aid",
  "Search & Rescue",
  "Medical",
  "Fire Fighting",
  "Navigation",
  "Communication",
];

const Volunteer = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [docType, setDocType] = useState("ID_PROOF");
  const [uploading, setUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const res = await uploadDocument(file, docType);
      if (res.success) {
        setUploadedDocs((prev) => [...prev, res.document || { url: res.url, type: docType }]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skills.length) return setError("Select at least one skill");
    setLoading(true);
    setError("");
    try {
      const res = await applyForRescue(skills);
      if (res.success) setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (user?.role === "RESCUE") {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto text-center py-12">
          <p className="text-green-400 font-medium">
            You are already an approved rescue volunteer.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (user?.rescueApplicationStatus === "PENDING") {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto text-center py-12">
          <p className="text-yellow-300 font-medium">
            Your application is pending admin approval.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Volunteer Application</h1>

        {submitted ? (
          <div className="bg-slate-900/60 border border-green-500/30 rounded-xl p-8 text-center">
            <p className="text-green-400 font-medium">
              Application submitted! An administrator will review your profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 space-y-4">
              <p className="text-slate-400 text-sm">Select your skills:</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      skills.includes(skill)
                        ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                        : "border-white/10 text-slate-400"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 space-y-4">
              <p className="text-slate-400 text-sm">Upload verification documents (optional):</p>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
              >
                <option value="ID_PROOF">ID Proof</option>
                <option value="CERTIFICATE">Certificate</option>
              </select>
              <label className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/20 rounded-lg text-slate-400 hover:text-white cursor-pointer transition">
                <Upload size={18} />
                {uploading ? "Uploading..." : "Choose file (PDF/JPG/PNG)"}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {uploadedDocs.length > 0 && (
                <ul className="text-xs text-green-400 space-y-1">
                  {uploadedDocs.map((doc, i) => (
                    <li key={i}>{doc.type}: uploaded</li>
                  ))}
                </ul>
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Volunteer;
