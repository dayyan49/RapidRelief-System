import { Link, Navigate } from "react-router-dom";
import { AlertTriangle, Brain, Radio, Users, Clock, Shield, Activity } from "lucide-react";
import PublicLayout from "../layouts/PublicLayout.jsx";
import Button from "../components/common/Button.jsx";
import useAuth from "../hooks/useAuth.js";
import { heroBg } from "../assets/assets.js";

const features = [
  { icon: Activity, title: "Real-time Incident Tracking", desc: "Monitor disasters and rescue operations live with GPS and Socket.IO updates." },
  { icon: Brain, title: "AI Resource Prediction", desc: "ML-powered forecasting of teams, ambulances, medical kits, and food supplies." },
  { icon: Users, title: "Rescue Team Coordination", desc: "Assign, track, and manage rescue personnel across active incidents." },
  { icon: Radio, title: "Emergency Communication", desc: "Instant alerts and status updates for citizens, rescuers, and admins." },
];

const stats = [
  { label: "Active Incidents", value: "24/7", icon: AlertTriangle },
  { label: "Rescue Teams", value: "150+", icon: Users },
  { label: "Citizens Assisted", value: "10K+", icon: Shield },
  { label: "Avg Response Time", value: "< 15 min", icon: Clock },
];

const Landing = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const paths = { ADMIN: "/admin/dashboard", RESCUE: "/rescue/dashboard", USER: "/citizen/dashboard" };
    return <Navigate to={paths[user?.role] || "/citizen/dashboard"} replace />;
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/80 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm mb-6">
            <Shield size={14} /> Government-Grade Emergency Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Intelligent Disaster<br />
            <span className="gradient-text">Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            AI-powered emergency response and resource coordination platform connecting citizens, rescue teams, and administrators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/report"><Button size="lg"><AlertTriangle size={18} /> Report Incident</Button></Link>
            <Link to="/volunteer"><Button size="lg" variant="outline"><Users size={18} /> Join Rescue Team</Button></Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Platform Capabilities</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Enterprise-grade tools for coordinated disaster response</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass-card p-6 hover:border-teal-500/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-teal-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center p-6">
                <Icon size={28} className="text-teal-400 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-slate-400 text-sm mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto glass-card p-10 border-teal-500/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to make a difference?</h2>
          <p className="text-slate-400 mb-6">Join thousands coordinating faster, smarter disaster response.</p>
          <Link to="/register"><Button size="lg">Create Free Account</Button></Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Landing;
