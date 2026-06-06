import { Link } from "react-router-dom";
import {
  Shield, Brain, Radio, Users, MapPin, Zap,
  AlertTriangle, Heart, BarChart3,
} from "lucide-react";
import Button from "../../components/common/Button.jsx";
import { heroBg } from "../../assets/assets.js";

const pillars = [
  {
    icon: Shield,
    title: "Citizen Safety First",
    desc: "Empower every citizen to report disasters, request SOS help, and track rescue operations in real time from a single portal.",
  },
  {
    icon: Users,
    title: "Rescue Coordination",
    desc: "Connect verified rescue volunteers with live GPS tracking, task management, and instant assignment notifications.",
  },
  {
    icon: BarChart3,
    title: "Admin Command Center",
    desc: "Give administrators full oversight — incident management, volunteer approvals, inventory control, and AI-driven resource planning.",
  },
];

const capabilities = [
  { icon: Brain, label: "AI Resource Prediction" },
  { icon: MapPin, label: "KD-Tree Spatial Search" },
  { icon: Radio, label: "Socket.IO Real-Time" },
  { icon: Zap, label: "Sub-15 Min Response" },
  { icon: AlertTriangle, label: "Multi-Disaster Support" },
  { icon: Heart, label: "Volunteer Network" },
];

const techStack = ["React + Vite", "Tailwind CSS", "Node.js + Express", "MongoDB", "Python FastAPI", "Socket.IO", "Leaflet Maps", "Cloudinary"];

const About = () => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section
      className="relative pt-28 pb-20 px-4 overflow-hidden"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/85 to-navy-950" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm mb-6">
          About Rapid Relief
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Intelligent Disaster<br /><span className="gradient-text">Management System</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A full-stack emergency response platform that unites citizens, rescue personnel, and administrators
          through AI-powered coordination, real-time communication, and spatial resource optimization.
        </p>
      </div>
    </section>

    {/* Mission */}
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="glass-card p-8 md:p-12 border-teal-500/10">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed text-lg max-w-3xl">
          When disasters strike, every second counts. Rapid Relief was built to eliminate communication gaps,
          reduce response delays, and ensure the right resources reach the right people at the right time —
          whether it's a flood, earthquake, fire, or cyclone.
        </p>
      </div>
    </section>

    {/* Three pillars */}
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-10">Built for Three Roles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="glass-card p-6 hover:border-teal-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <Icon size={24} className="text-teal-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>

    {/* Capabilities */}
    <section className="py-16 px-4 bg-slate-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Platform Capabilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="glass-card p-4 text-center hover:scale-105 transition">
                <Icon size={22} className="text-teal-400 mx-auto mb-2" />
                <p className="text-slate-300 text-xs font-medium">{c.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Tech stack */}
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-white text-center mb-8">Technology Stack</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((t) => (
          <span key={t} className="px-4 py-2 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 text-sm">
            {t}
          </span>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 px-4 max-w-2xl mx-auto text-center">
      <div className="glass-card p-10 border-teal-500/20">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to get involved?</h2>
        <p className="text-slate-400 mb-6">Report incidents, join as a rescue volunteer, or coordinate response as an administrator.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/report"><Button><AlertTriangle size={16} /> Report Incident</Button></Link>
          <Link to="/volunteer"><Button variant="outline"><Heart size={16} /> Join Rescue Team</Button></Link>
        </div>
      </div>
    </section>
  </div>
);

export default About;
