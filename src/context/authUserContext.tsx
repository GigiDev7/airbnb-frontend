import { createContext, useState } from "react";
import { ICreatedBy as IUser } from "../interfaces";

const AuthUserContext = createContext<{
  user: null | IUser;
  updateUser: (user: null | IUser) => void;
}>({ user: null, updateUser: (user) => {} });

export const AuthUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = (user: null | IUser) => {
    setUser(user);
  };

  return (
    <AuthUserContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContext;
