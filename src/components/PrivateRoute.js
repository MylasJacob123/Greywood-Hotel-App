import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ isAuthenticated, children, isAdminRoute = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated) {
    Swal.fire({
      title: "Unauthorized!",
      text: "You must be logged in to access this page.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && (!user || !user.isAdmin)) {
    Swal.fire({
      title: "Access Denied!",
      text: "You do not have the required permissions to access this page.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
