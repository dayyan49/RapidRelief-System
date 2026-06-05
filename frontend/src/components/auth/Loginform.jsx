import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Mail, Lock, Eye, EyeOff,} from "lucide-react";
import { loginUser } from "../../api/auth.api.js";
import { heroBg } from "../../assets/assets.js";
import useAuth from "../../hooks/useAuth.js";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(formData);
      if (response.success) {
        login(
          response.user,
          response.user.accesstoken
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
};

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center pt-18 md:pt-18 relative pb-15"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 w-full max-w-2xl text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Rapid Relief Portal
        </h1>

        <p className="text-lg md:text-xl text-slate-300">
          Coordinate Response • Real-Time Alerts • Community Services & Safety
        </p>

        <p className="mt-3 text-slate-400 max-w-xl mx-auto">
          One platform connecting citizens, volunteers, and authorities during emergencies.
        </p>
      </div>
      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Sign in to RapidRelief
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  h-11
                  pl-10
                  pr-4
                  rounded-4xl
                  bg-slate-800/80
                  border
                  border-slate-700
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-teal-500
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="
                  w-full
                  h-11
                  pl-10
                  pr-12
                  rounded-4xl
                  bg-slate-800/80
                  border
                  border-slate-700
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:border-teal-500
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={
                  formData.rememberMe
                }
                onChange={handleChange}
                className="accent-teal-500"
              />

              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="
                text-teal-400
                hover:text-teal-300
              "
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-11
              bg-teal-500
              hover:bg-teal-600
              rounded-lg
              text-white
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              text-teal-400
              hover:text-teal-300
              font-medium
            "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;