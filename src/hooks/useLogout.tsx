import { useContext } from "react";
import AuthUserContext from "../context/authUserContext";

export const useLogout = () => {
  const authUserContext = useContext(AuthUserContext);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    authUserContext.updateUser(null);
  };

  return { logout };
};
