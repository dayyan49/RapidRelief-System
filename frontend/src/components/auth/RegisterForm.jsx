import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { heroBg } from "../../assets/assets";
// import { registerUser } from "../../services/auth.service";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return alert("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return alert(
        "Password must be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase(),
        phoneNumber:
          formData.phoneNumber.trim(),
        password: formData.password,
        confirmPassword:
          formData.confirmPassword,
      };

      console.log(payload);

      // await registerUser(payload);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        px-4
        pt-28
        pb-10
        relative
      "
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Hero Text */}
      <div className="relative z-10 text-center mb-8 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Join Rapid Relief
        </h1>

        <p className="text-slate-300 text-lg">
          Connect with citizens,
          volunteers and emergency
          responders
        </p>

        <p className="mt-3 text-slate-400">
          Build a safer and more
          responsive community.
        </p>
      </div>

      {/* Register Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-slate-900/70
          backdrop-blur-md
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          p-6
          md:p-8
        "
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-slate-400 mt-2">
            Join RapidRelief today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Name */}
          <div className="relative">
            <User
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
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-full
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

          {/* Email */}
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
              placeholder="Email Address"
              required
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-full
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

          {/* Phone */}
          <div className="relative">
            <Phone
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
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-full
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

          {/* Password */}
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
              placeholder="Password"
              required
              className="
                w-full
                h-11
                pl-10
                pr-12
                rounded-full
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

          {/* Confirm Password */}
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
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="
                w-full
                h-11
                pl-10
                pr-12
                rounded-full
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
                setShowConfirmPassword(
                  !showConfirmPassword
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
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-11
              bg-teal-500
              hover:bg-teal-600
              rounded-full
              text-white
              font-semibold
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              text-teal-400
              hover:text-teal-300
              font-medium
            "
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;