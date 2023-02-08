import React, { createContext, useState, useEffect, MouseEvent } from "react";
import { useToggleWindow } from "../hooks/useWindow";

const AuthFormContext = createContext({
  type: "",
  showAuthForm: (e: MouseEvent, type: string) => {},
  hideAuthForm: () => {},
});

export const AuthFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authForm, setAuthForm] = useState("");
  const { isWindowShown, hideWindow, showWindow } = useToggleWindow(true);

  useEffect(() => {
    if (!isWindowShown) {
      setAuthForm("");
    }
  }, [isWindowShown]);

  const showAuthForm = (e: MouseEvent, type: string) => {
    showWindow(e);
    setAuthForm(type);
  };

  const hideAuthForm = () => {
    hideWindow();
    setAuthForm("");
  };

  return (
    <AuthFormContext.Provider
      value={{ type: authForm, showAuthForm, hideAuthForm }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};

export default AuthFormContext;
