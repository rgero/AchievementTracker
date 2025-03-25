import { Navigate, useLocation } from "react-router-dom";

import Loading from "./ui/Loading";
import React from "react";
import { useAuth } from "../context/AuthenticationContext";

const AuthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation(); // To keep track of where the user was

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
