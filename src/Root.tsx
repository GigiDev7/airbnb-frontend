import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AuthFormContext from "./context/authFormContext";

const Root = () => {
  const authFormContext = useContext(AuthFormContext);

  return (
    <div className="flex flex-col justify-between h-screen">
      {authFormContext.type && <AuthForm type={authFormContext.type} />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
