import { Link, Navigate } from "react-router-dom";
import { AlertTriangle, Heart, MapPin, Shield, Users } from "lucide-react";
import useAuth from "../../hooks/useAuth.js";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { heroBg } from "../../assets/assets.js";
import { ROLE_DASHBOARD } from "../../utils/constants.js";

const quickActions = [
  {
    title: "Report Incident",
    desc: "Report a disaster or emergency in your area",
    path: "/report",
    icon: AlertTriangle,
    color: "from-red-500/20 to-red-600/10 border-red-500/30",
  },
  {
    title: "Emergency SOS",
    desc: "One-tap help request with your GPS location",
    path: "/emergency",
    icon: Heart,
    color: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  },
  {
    title: "Live Tracking",
    desc: "Track your active rescue operations",
    path: "/tracking",
    icon: MapPin,
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  },
  {
    title: "Assistance Centers",
    desc: "Find nearby shelters, medical camps & supplies",
    path: "/centers",
    icon: Shield,
    color: "from-teal-500/20 to-teal-600/10 border-teal-500/30",
  },
];

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role === "ADMIN") {
    return <Navigate to={ROLE_DASHBOARD.ADMIN} replace />;
  }
  if (isAuthenticated && user?.role === "RESCUE") {
    return <Navigate to={ROLE_DASHBOARD.RESCUE} replace />;
  }

  if (!isAuthenticated) {
    return (
      <section
        className="min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 relative"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Intelligent Disaster Management
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Real-time coordination for citizens, rescue teams, and administrators
            during emergencies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/emergency"
              className="px-6 py-3 border border-red-500/50 text-red-300 hover:bg-red-500/10 rounded-lg font-semibold"
            >
              Emergency SOS
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
          Welcome, {user?.name || "Citizen"}
        </h1>
        <p className="text-slate-400 mb-8">
          Report incidents, request help, and track rescue operations in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className={`p-5 rounded-xl border bg-gradient-to-br ${action.color} hover:scale-[1.02] transition`}
              >
                <Icon className="text-teal-400 mb-3" size={28} />
                <h3 className="text-white font-semibold text-lg">{action.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{action.desc}</p>
              </Link>
            );
          })}
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-teal-400" size={22} />
            <h2 className="text-white font-semibold">Become a Rescue Volunteer</h2>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Join our network of trained volunteers to help communities during disasters.
          </p>
          <Link
            to="/volunteer"
            className="inline-block px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-white text-sm"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
