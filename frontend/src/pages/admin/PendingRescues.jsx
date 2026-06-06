import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Button from "../../components/common/Button.jsx";
import { getPendingRescues, approveRescue } from "../../api/admin.api.js";

const PendingRescues = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(null);

  const fetchUsers = () => {
    getPendingRescues()
      .then((res) => setUsers(res.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    setApproving(userId);
    try {
      await approveRescue(userId);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setApproving(null);
    }
  };

  return (
    <DashboardLayout title="Approve Volunteers" subtitle="Review and verify rescue personnel applications">
      <div className="max-w-4xl">

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-400">No pending applications.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-slate-900/60 border border-white/10 rounded-xl p-5 flex flex-wrap justify-between items-center gap-4"
              >
                <div>
                  <h3 className="text-white font-medium">{user.name}</h3>
                  <p className="text-slate-400 text-sm">{user.email}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Skills: {(user.skills || []).join(", ") || "None listed"}
                  </p>
                </div>
                <Button
                  onClick={() => handleApprove(user._id)}
                  disabled={approving === user._id}
                >
                  {approving === user._id ? "Approving..." : "Approve"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PendingRescues;
