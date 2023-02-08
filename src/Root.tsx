import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Root = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
