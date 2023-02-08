import React, { createContext, useState } from "react";

const AuthFormContext = createContext({
  type: "",
  showAuthForm: (type: string) => {},
  hideAuthForm: () => {},
});

export const AuthFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authForm, setAuthForm] = useState("");

  const showAuthForm = (type: string) => {
    setAuthForm(type);
  };

  const hideAuthForm = () => {
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
