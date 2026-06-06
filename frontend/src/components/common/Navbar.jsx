import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Shield, AlertTriangle } from "lucide-react";
import { logo } from "../../assets/assets.js";
import useAuth from "../../hooks/useAuth.js";
import { getUser } from "../../utils/token.js";
import NotificationPanel from "./NotificationPanel.jsx";
import Button from "./Button.jsx";

const publicLinks = [
  { name: "Features", href: "/#features" },
  { name: "About", to: "/about" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = ({ variant = "public" }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const activeUser = user || getUser();

  const dashboardHome =
    activeUser?.role === "ADMIN" ? "/admin/dashboard"
    : activeUser?.role === "RESCUE" ? "/rescue/dashboard"
    : "/citizen/dashboard";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={isAuthenticated ? dashboardHome : "/"} className="flex items-center gap-2.5 group">
          <img src={logo} alt="Rapid Relief" className="w-9 h-9 object-contain" />
          <div>
            <span className="text-white font-bold text-lg leading-tight block">Rapid Relief</span>
            {variant === "dashboard" && activeUser?.role && (
              <span className="text-[10px] text-teal-400 uppercase tracking-wider">{activeUser.role} Portal</span>
            )}
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {variant === "public" && !isAuthenticated && publicLinks.map((l) =>
            l.to ? (
              <Link key={l.name} to={l.to} className="text-slate-300 hover:text-teal-400 text-sm transition">{l.name}</Link>
            ) : (
              <a key={l.name} href={l.href} className="text-slate-300 hover:text-teal-400 text-sm transition">{l.name}</a>
            )
          )}

          <Link
            to="/report"
            className="flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 rounded-lg transition"
          >
            <AlertTriangle size={15} />
            Report
          </Link>

          {isAuthenticated && (
            <>
              <NotificationPanel />
              <span className="text-slate-400 text-sm flex items-center gap-1.5">
                <Shield size={14} className="text-teal-400" />
                {activeUser?.name || activeUser?.role}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white text-sm transition">Sign In</Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
          {variant === "public" && publicLinks.map((l) =>
            l.to ? <Link key={l.name} to={l.to} onClick={() => setOpen(false)} className="block text-slate-300 py-2">{l.name}</Link>
            : <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="block text-slate-300 py-2">{l.name}</a>
          )}
          <Link to="/report" onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-teal-400 py-2 font-medium">
            <AlertTriangle size={16} /> Report Incident
          </Link>
          {isAuthenticated ? (
            <Button variant="secondary" className="w-full" onClick={() => { handleLogout(); setOpen(false); }}>Logout</Button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block text-center py-2 text-slate-300">Sign In</Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button className="w-full">Get Started</Button></Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
