import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/assets.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Incident", path: "/report" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="RapidRelief Logo"
            className="w-9 h-9 object-contain"
          />

          <span className="text-white font-bold text-lg md:text-xl">
            RapidRelief
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-teal-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-4 py-5">

          <div className="flex flex-col gap-5 text-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-teal-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 border border-white/20 rounded-lg text-white"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 bg-teal-500 rounded-lg text-white font-semibold"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;