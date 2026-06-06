import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "../pages/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";

import CitizenDashboard from "../pages/citizen/CitizenDashboard.jsx";
import ReportIncident from "../pages/user/ReportIncident.jsx";
import EmergencyHelp from "../pages/user/EmergencyHelp.jsx";
import MyRequest from "../pages/user/MyRequest.jsx";
import LiveTracking from "../pages/user/LiveTracking.jsx";
import AssistanceCenters from "../pages/user/AssistanceCenters.jsx";
import Volunteer from "../pages/user/Volunteer.jsx";
import About from "../pages/user/About.jsx";

import RescueDashboard from "../pages/rescue/RescueDashboard.jsx";
import RescueTasks from "../pages/rescue/RescueTasks.jsx";
import RescueMap from "../pages/rescue/RescueMap.jsx";
import RescueProfile from "../pages/rescue/RescueProfile.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminAnalytics from "../pages/admin/AdminAnalytics.jsx";
import AdminIncidents from "../pages/admin/AdminIncidents.jsx";
import PendingRescues from "../pages/admin/PendingRescues.jsx";
import AdminInventory from "../pages/admin/AdminInventory.jsx";
import AdminSettings from "../pages/admin/AdminSettings.jsx";

import Privacy from "../pages/legal/Privacy.jsx";
import Terms from "../pages/legal/Terms.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";
import PublicLayout from "../layouts/PublicLayout.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
    <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
    <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
    <Route path="/emergency" element={<EmergencyHelp />} />
    <Route path="/centers" element={<AssistanceCenters />} />
    <Route path="/report" element={<ReportIncident />} />

    <Route element={<ProtectedRoute roles={["USER", "ADMIN"]} />}>
      <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
      <Route path="/my-requests" element={<MyRequest />} />
      <Route path="/tracking" element={<LiveTracking />} />
      <Route path="/volunteer" element={<Volunteer />} />
    </Route>

    <Route element={<ProtectedRoute roles={["RESCUE"]} />}>
      <Route path="/rescue/dashboard" element={<RescueDashboard />} />
      <Route path="/rescue/tasks" element={<RescueTasks />} />
      <Route path="/rescue/map" element={<RescueMap />} />
      <Route path="/rescue/profile" element={<RescueProfile />} />
    </Route>

    <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/admin/incidents" element={<AdminIncidents />} />
      <Route path="/admin/pending-rescues" element={<PendingRescues />} />
      <Route path="/admin/inventory" element={<AdminInventory />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
