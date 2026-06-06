import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import useAuth from "../../hooks/useAuth.js";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Settings" subtitle="System configuration and admin preferences">
      <div className="max-w-2xl space-y-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Account</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Admin Email</span>
              <span className="text-white">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Role</span>
              <span className="text-teal-400">{user?.role}</span>
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-2">System Info</h3>
          <p className="text-slate-400 text-sm">Rapid Relief v1.0 — Intelligent Disaster Management System</p>
          <p className="text-slate-500 text-xs mt-2">ML Service: Python FastAPI | Database: MongoDB | Real-time: Socket.IO</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
