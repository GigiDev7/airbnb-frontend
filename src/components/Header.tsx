import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex items-center">
        <img className="w-8" src="/airbnb.png" alt="logo" />
        <h2 className="ml-3 text-red-500 font-bold text-2xl">airbnb</h2>
      </div>
    </header>
  );
};

export default Header;
