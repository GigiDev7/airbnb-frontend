import React, { useState } from "react";
import { TbWorld } from "react-icons/tb";
import { GoThreeBars } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import HeaderSearch from "./HeaderSearch";

const Header: React.FC = () => {
  const [isWindowShown, setIsWindowShown] = useState(false);
  const [clickedOption, setClickedOption] = useState("");
  const [isFormShown, setIsFormShown] = useState(false);

  const handleWindowShow = () => setIsWindowShown((prev) => !prev);

  return (
    <header className="flex items-center justify-between">
      <div className=" flex items-cente">
        <img className="w-8 cursor-pointer" src="/airbnb.png" alt="logo" />
        <h2 className="ml-3 text-red-500 font-bold text-2xl hidden lg:inline-block">
          airbnb
        </h2>
      </div>

      {!isFormShown ? (
        <div
          onClick={() => setIsFormShown(true)}
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
        <HeaderSearch />
      )}

      <div className="flex items-cente">
        <div className="mr-4 hover:bg-gray-200 py-2 px-3 rounded-3xl">
          <TbWorld className="text-xl cursor-pointer" />
        </div>
        <div
          onClick={handleWindowShow}
          className="relative flex items-center border-2 py-2 px-3 rounded-3xl hover:shadow-md cursor-pointer"
        >
          <GoThreeBars className="text-xl mr-2" />
          <BsFillPersonFill className="text-xl" />
        </div>
        {isWindowShown && (
          <div className="flex flex-col absolute top-12 right-10 lg:right-16 shadow-2xl border-[1px] rounded-xl py-4">
            <a className="pl-4 pr-16 hover:bg-gray-100 py-4" href="#">
              Sign up
            </a>
            <a
              className="pl-4 pr-16 border-b-[1px]  hover:bg-gray-100 py-4"
              href="#"
            >
              Log in
            </a>
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
  );
};

export default Header;
