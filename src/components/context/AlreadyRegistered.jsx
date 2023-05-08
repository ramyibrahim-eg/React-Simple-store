import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./GlobalState";

const AlreadyRegistered = ({ children }) => {
  const { currentUser } = useAuth();

  const location = useLocation();

  if (currentUser) {
    return <Navigate to="/profile" state={{ path: location.pathname }} />;
  }
  return children;
};

export default AlreadyRegistered;
