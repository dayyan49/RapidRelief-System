import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const Protected = () => {
  const token = localStorage.getItem("token");

  const loading = false;

  if (loading) {
    return <Loader />;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protected;