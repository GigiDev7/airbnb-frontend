import React, { useContext } from "react";
import AuthUserContext from "./context/authUserContext";
import { useNavigate, Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthUserContext);
  const token = localStorage.getItem("token");

  if (!authContext.user && !token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
