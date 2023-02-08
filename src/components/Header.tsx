import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import { GoThreeBars } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import HeaderSearch from "./HeaderSearch";
import { useToggleWindow } from "../hooks/useWindow";
import ModalLayout from "./ModalLayout";
import AuthFormContext from "../context/authFormContext";

const Header: React.FC = () => {
  const personWindow = useToggleWindow();
  const formWindow = useToggleWindow(true);
  const languageWindow = useToggleWindow();

  const authFormContext = useContext(AuthFormContext);

  const handleFormShow = (type: string) => {
    authFormContext.showAuthForm(type);
    personWindow.hideWindow();
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("click", formWindow.hideWindow);
    };
  }, []);

  return (
    <div className="flex flex-col sticky top-0 bg-white z-50">
      <header className="flex items-center justify-between flex-wrap lg:flex-nowrap border-b-[1px] py-4">
        <Link to="/" className=" flex items-center">
          <img className="w-8 cursor-pointer" src="/airbnb.png" alt="logo" />
          <h2 className="ml-3 text-red-500 font-bold text-2xl hidden lg:inline-block">
            airbnb
          </h2>
        </Link>

        {languageWindow.isWindowShown && (
          <ModalLayout closeModal={languageWindow.hideWindow}>
            <div className="self-start mt-16">
              <h2 className="text-2xl font-medium mb-8">
                Choose a language and region
              </h2>
              <div className="flex gap-8">
                <div className="border-[1px] border-black py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md">
                  <h2>English</h2>
                  <p className="text-gray-500">United States</p>
                </div>
                <div className=" py-2 px-3 hover:bg-gray-100 cursor-pointer rounded-md">
                  <h2>ქართული</h2>
                  <p className="text-gray-500">საქართველო</p>
                </div>
              </div>
            </div>
          </ModalLayout>
        )}

        {!formWindow.isWindowShown ? (
          <div
            onClick={(e) => formWindow.showWindow(e)}
            className="flex items-center border-2 p-2 rounded-3xl"
          >
            <button className="px-2">Anywhere</button>
            <span className="mx-2 text-gray-400">&#9474;</span>
            <button className="px-2">Any day</button>
            <span className="mx-2 text-gray-400">&#9474;</span>
            <button className="px-2 text-gray-500">Add guests</button>
            <button className="bg-red-500 p-2 rounded-3xl hover:bg-red-600">
              <BiSearch className="text-white" />
            </button>
          </div>
        ) : (
          <div className="order-last lg:-order-none mt-8 lg:mt-0">
            <HeaderSearch showForm={formWindow.showWindow} />
          </div>
        )}

        <div className="flex items-center">
          <div
            onClick={languageWindow.showWindow}
            className="mr-4 hover:bg-gray-200 py-2 px-3 rounded-3xl"
          >
            <TbWorld className="text-xl cursor-pointer" />
          </div>
          <div
            onClick={personWindow.toggleWindow}
            className="relative flex items-center border-2 py-2 px-3 rounded-3xl hover:shadow-md cursor-pointer"
          >
            <GoThreeBars className="text-xl mr-2" />
            <BsFillPersonFill className="text-xl" />
          </div>
          {personWindow.isWindowShown && (
            <div className="flex flex-col absolute top-16 right-10 lg:right-20 lg:top-16 shadow-2xl border-[1px] rounded-xl py-4 z-30 bg-white">
              <button
                onClick={() => handleFormShow("Register")}
                className="pl-4 pr-16 hover:bg-gray-100 py-4"
              >
                Sign up
              </button>
              <button
                onClick={() => handleFormShow("Login")}
                className="pl-4 pr-16 border-b-[1px]  hover:bg-gray-100 py-4"
              >
                Log in
              </button>
              <a className="pl-4 pr-16 hover:bg-gray-100 py-4" href="#">
                Host an experience
              </a>
              <a className="pl-4 pr-12 hover:bg-gray-100 py-4" href="#">
                Help
              </a>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
