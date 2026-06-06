import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, Heart } from "lucide-react";
import { registerUser } from "../../api/auth.api.js";
import useAuth from "../../hooks/useAuth.js";
import useToast from "../../hooks/useToast.js";
import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import { ROLE_DASHBOARD } from "../../utils/constants.js";

const RegisterForm = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("citizen");
  const [form, setForm] = useState({
    name: "", email: "", phoneNumber: "", password: "", confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast("Passwords do not match", "error");
    if (form.password.length < 6) return toast("Password must be at least 6 characters", "error");

    setLoading(true);
    try {
      const res = await registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phoneNumber: form.phoneNumber.replace(/\D/g, ""),
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (res.success && res.token && res.user) {
        login(res.user, res.token);
        toast("Account created! Welcome to Rapid Relief.", "success");
        const path = role === "rescue"
          ? "/volunteer"
          : ROLE_DASHBOARD[res.user.role] || "/citizen/dashboard";
        navigate(path, { replace: true });
      } else if (res.success) {
        toast("Account created! Please sign in.", "success");
        navigate("/login", { replace: true });
      }
    } catch (err) {
      toast(err.toastMessage || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md glass-card p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm">Join the Rapid Relief network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" icon={User} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" icon={Mail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Phone Number" type="tel" icon={Phone} value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} required />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Register As</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "citizen", label: "Citizen", icon: Shield },
                { id: "rescue", label: "Rescue Volunteer", icon: Heart },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <button key={r.id} type="button" onClick={() => setRole(r.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-sm transition ${
                      role === r.id ? "border-teal-500/50 bg-teal-500/10 text-teal-300" : "border-slate-700 text-slate-400 hover:border-slate-600"
                    }`}>
                    <Icon size={16} /> {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPass ? "text" : "password"} value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-11 pl-10 pr-12 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Input label="Confirm Password" type="password" icon={Lock} value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />

          <Button type="submit" className="w-full" size="lg" loading={loading}>Create Account</Button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-teal-400 font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
