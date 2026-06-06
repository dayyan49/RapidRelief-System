import { Link } from "react-router-dom";
import { ShieldOff } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <ShieldOff size={48} className="text-red-400 mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
      <p className="text-slate-400 mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;
