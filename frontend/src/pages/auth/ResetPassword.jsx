import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { resetPassword } from "../../api/auth.api.js";
import useToast from "../../hooks/useToast.js";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    token: params.get("token") || "", newPassword: "", confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resetPassword(form);
      if (res.success) { toast("Password reset!", "success"); navigate("/login"); }
    } catch (err) {
      toast(err.toastMessage || "Reset failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md glass-card p-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-white mb-6">Reset Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Reset Token" value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} required />
            <Input label="New Password" type="password" icon={Lock} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
            <Input label="Confirm Password" type="password" icon={Lock} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
            <Button type="submit" className="w-full" loading={loading}>Reset Password</Button>
          </form>
          <p className="text-center text-slate-400 mt-6 text-sm"><Link to="/login" className="text-teal-400">Back to Login</Link></p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ResetPassword;
