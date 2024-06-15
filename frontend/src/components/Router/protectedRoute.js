import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, ...props }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  return <>{isLoggedIn ? <Outlet /> : <Navigate to="./login" />}</>;
};

export default ProtectedRoute;
