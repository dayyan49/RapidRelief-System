import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { forgotPassword } from "../../api/auth.api.js";
import useToast from "../../hooks/useToast.js";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      toast(res.message, "success");
      if (res.resetUrl) setResetUrl(res.resetUrl);
    } catch (err) {
      toast(err.toastMessage || "Request failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout hideFooter>
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md glass-card p-8 animate-slide-up">
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
          <p className="text-slate-400 text-sm mb-6">Enter your email for reset instructions</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" className="w-full" loading={loading}>Send Reset Link</Button>
          </form>
          {resetUrl && <p className="text-xs text-slate-400 mt-4">Dev link: <Link to={resetUrl} className="text-teal-400">{resetUrl}</Link></p>}
          <p className="text-center text-slate-400 mt-6 text-sm"><Link to="/login" className="text-teal-400">Back to Login</Link></p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForgotPassword;
