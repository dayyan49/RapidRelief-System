import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, AlertTriangle, MapPin, ClipboardList, Users,
  Shield, Heart, Package, BarChart3, Map, UserCircle, Settings,
} from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

const links = {
  USER: [
    { name: "Dashboard", path: "/citizen/dashboard", icon: LayoutDashboard },
    { name: "Report Incident", path: "/report", icon: AlertTriangle },
    { name: "Emergency SOS", path: "/emergency", icon: Heart },
    { name: "My Requests", path: "/my-requests", icon: ClipboardList },
    { name: "Live Tracking", path: "/tracking", icon: MapPin },
    { name: "Safe Zones", path: "/centers", icon: Shield },
    { name: "Volunteer", path: "/volunteer", icon: Users },
  ],
  RESCUE: [
    { name: "Dashboard", path: "/rescue/dashboard", icon: LayoutDashboard },
    { name: "My Tasks", path: "/rescue/tasks", icon: ClipboardList },
    { name: "Live Map", path: "/rescue/map", icon: Map },
    { name: "Profile", path: "/rescue/profile", icon: UserCircle },
    { name: "Apply Volunteer", path: "/volunteer", icon: Users },
  ],
  ADMIN: [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Incidents", path: "/admin/incidents", icon: AlertTriangle },
    { name: "Inventory", path: "/admin/inventory", icon: Package },
    { name: "Rescue Teams", path: "/admin/pending-rescues", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],
};

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navLinks = links[user?.role] || links.USER;

  return (
    <>
      <aside className="w-64 shrink-0 bg-slate-900/40 border-r border-white/10 min-h-[calc(100vh-4rem)] p-4 hidden lg:block">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-4 px-3 font-semibold">
          Navigation
        </p>
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-teal-500/15 text-teal-300 border border-teal-500/25 shadow-lg shadow-teal-500/5"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-white/10 px-2 py-2 flex justify-around">
        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} className={`flex flex-col items-center gap-0.5 p-2 rounded-lg text-[10px] ${active ? "text-teal-400" : "text-slate-500"}`}>
              <Icon size={18} />
              <span className="truncate max-w-[56px]">{link.name.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
