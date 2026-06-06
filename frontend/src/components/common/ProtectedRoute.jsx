import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { getToken, getUser } from "../../utils/token.js";
import Loader from "./Loader.jsx";
import { ROLE_DASHBOARD } from "../../utils/constants.js";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();
  const token = getToken();
  const storedUser = getUser();
  const activeUser = user || storedUser;
  const isAuthenticated = !!token;

  if (loading) return <Loader fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  if (roles && activeUser?.role && !roles.includes(activeUser.role)) {
    const redirect = ROLE_DASHBOARD[activeUser.role] || "/";
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
