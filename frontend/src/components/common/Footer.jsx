import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3">

              <img
                src={logo}
                alt="RapidRelief"
                className="w-10 h-10"
              />

              <h2 className="text-xl font-bold">
                RapidRelief
              </h2>

            </div>

            <p className="mt-4 text-gray-400 text-sm">
              RapidRelief is a disaster management platform that
              enables citizens, volunteers, and authorities to
              coordinate efficiently during emergencies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-400">

              <Link to="/" className="hover:text-teal-400">
                Home
              </Link>

              <Link to="/report" className="hover:text-teal-400">
                Report Incident
              </Link>

              <Link to="/volunteer" className="hover:text-teal-400">
                Volunteer
              </Link>

              <Link to="/about" className="hover:text-teal-400">
                About Us
              </Link>

            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Emergency Contacts
            </h3>

            <div className="space-y-2 text-gray-400">

              <p>🚓 Police: 100</p>

              <p>🚑 Ambulance: 108</p>

              <p>🔥 Fire Brigade: 101</p>

              <p>🆘 Disaster Helpline: 112</p>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <div className="space-y-2 text-gray-400">

              <p>support@rapidrelief.com</p>

              <p>+91 98765 43210</p>

              <p>India</p>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RapidRelief. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">

            <Link
              to="/privacy"
              className="hover:text-teal-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-teal-400"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;