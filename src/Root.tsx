import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthFormContext from "./context/authFormContext";
import AuthUserContext from "./context/authUserContext";

const Root = () => {
  const authFormContext = useContext(AuthFormContext);
  const authUserContext = useContext(AuthUserContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      authUserContext.updateUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen">
      {authFormContext.type && <AuthForm />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
