import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Clock, CheckCircle, Radio } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import DashboardCard from "../../components/common/DashboardCard.jsx";
import Button from "../../components/common/Button.jsx";
import useAuth from "../../hooks/useAuth.js";
import { getMyTasks } from "../../api/rescue.api.js";

const RescueDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ assigned: 0, pending: 0, completed: 0 });

  useEffect(() => {
    getMyTasks().then((res) => {
      const tasks = res.tasks || [];
      setStats({
        assigned: tasks.length,
        pending: tasks.filter((t) => t.status === "ASSIGNED").length,
        completed: tasks.filter((t) => t.status === "COMPLETED").length,
      });
    }).catch(() => {});
  }, []);

  return (
    <DashboardLayout title={`Rescue Command, ${user?.name || "Officer"}`} subtitle="Your mission control center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Assigned Tasks" value={stats.assigned} icon={ClipboardList} color="blue" to="/rescue/tasks" />
        <DashboardCard title="Pending" value={stats.pending} icon={Clock} color="orange" to="/rescue/tasks" />
        <DashboardCard title="Completed" value={stats.completed} icon={CheckCircle} color="green" to="/rescue/tasks" />
        <DashboardCard title="Status" value="ON DUTY" subtitle="Active" icon={Radio} color="teal" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/rescue/tasks" className="glass-card p-6 hover:border-teal-500/30 transition">
          <h3 className="text-white font-semibold mb-2">View Task List</h3>
          <p className="text-slate-400 text-sm">Manage assigned incidents and update mission status</p>
        </Link>
        <Link to="/rescue/map" className="glass-card p-6 hover:border-teal-500/30 transition">
          <h3 className="text-white font-semibold mb-2">Live Operations Map</h3>
          <p className="text-slate-400 text-sm">Navigate to incident locations and view nearby resources</p>
        </Link>
      </div>

      <div className="mt-6">
        <Link to="/rescue/tasks"><Button size="lg">Go to Active Tasks</Button></Link>
      </div>
    </DashboardLayout>
  );
};

export default RescueDashboard;
