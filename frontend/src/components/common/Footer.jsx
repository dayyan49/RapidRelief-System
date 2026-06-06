import { Link } from "react-router-dom";
import { logo } from "../../assets/assets.js";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-navy-950 border-t border-white/10 mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Rapid Relief" className="w-9 h-9" />
            <span className="text-white font-bold text-lg">Rapid Relief</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            AI-powered emergency response and resource coordination for citizens, rescue teams, and administrators.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/about" className="hover:text-teal-400 transition">About</Link>
            <Link to="/report" className="hover:text-teal-400 transition">Report Incident</Link>
            <Link to="/volunteer" className="hover:text-teal-400 transition">Join Rescue Team</Link>
            <Link to="/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-teal-400 transition">Terms of Service</Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Emergency Numbers</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>Police: <span className="text-white font-medium">100</span></p>
            <p>Ambulance: <span className="text-white font-medium">108</span></p>
            <p>Fire Brigade: <span className="text-white font-medium">101</span></p>
            <p>Disaster Helpline: <span className="text-white font-medium">112</span></p>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2"><Mail size={14} className="text-teal-400" /> support@rapidrelief.com</p>
            <p className="flex items-center gap-2"><Phone size={14} className="text-teal-400" /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><MapPin size={14} className="text-teal-400" /> India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Rapid Relief. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-teal-400">Privacy</Link>
          <Link to="/terms" className="hover:text-teal-400">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
