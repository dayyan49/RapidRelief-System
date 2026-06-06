import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../api/auth.api.js";
import useAuth from "../../hooks/useAuth.js";
import useToast from "../../hooks/useToast.js";
import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import { ROLE_DASHBOARD } from "../../utils/constants.js";

const LoginForm = () => {
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(ROLE_DASHBOARD[user.role] || "/citizen/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      if (res.success && res.token && res.user) {
        login(res.user, res.token);
        toast("Welcome back!", "success");
        const path = ROLE_DASHBOARD[res.user.role] || "/citizen/dashboard";
        navigate(path, { replace: true });
      } else {
        toast("Invalid login response from server", "error");
      }
    } catch (err) {
      toast(err.toastMessage || err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md glass-card p-8 animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-2 text-sm">Sign in to Rapid Relief portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Email" type="email" icon={Mail} name="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" required />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPassword ? "text" : "password"} value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-11 pl-10 pr-12 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/40" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" checked={form.rememberMe}
                onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })} className="accent-teal-500 rounded" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-teal-400 hover:text-teal-300">Forgot Password?</Link>
          </div>

          <Button type="submit" className="w-full" size="lg" loading={loading}>Sign In</Button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-teal-400 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
