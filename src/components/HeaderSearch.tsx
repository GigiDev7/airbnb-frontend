import React, { MouseEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import GuestQuantity from "./GuestQuantity";
import { useToggleWindow } from "../hooks/useWindow";
import { useGuestQuantity } from "../hooks/useGuestQuantity";
import GuestQuantityBox from "./GuestQuantityBox";

const HeaderSearch: React.FC<{ showForm: (e: MouseEvent) => void }> = ({
  showForm,
}) => {
  const {
    isWindowShown: isQuantityWindowShown,
    hideWindow,
    showWindow,
  } = useToggleWindow(true);

  const { guestQuantity, decreaseQuantity, increaseQuantity, sumOfQuantities } =
    useGuestQuantity();

  const preserveOpenForm = (e: MouseEvent) => {
    showForm(e);
    hideWindow();
  };

  return (
    <form
      onClick={(e) => preserveOpenForm(e)}
      className="flex items-center border-2 p-2 rounded-3xl relative"
    >
      <div className="flex flex-col pl-2 ">
        <label>Where</label>
        <input
          type="text"
          className="outline-0 "
          placeholder="Search destinations"
        />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div className="flex flex-col">
        <label>Check in</label>
        <input type="date" className="outline-0 " placeholder="Add dates" />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div className="flex flex-col">
        <label>Check out</label>
        <input type="date" className="outline-0 " placeholder="Add dates" />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div
        onClick={(e) => showWindow(e)}
        className="flex flex-col mr-6 cursor-pointer"
      >
        <h2>Who</h2>
        <p className="text-gray-400">{sumOfQuantities()}</p>
      </div>
      {isQuantityWindowShown && (
        <GuestQuantityBox
          data={Object.entries(guestQuantity)}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      )}
      <button className="bg-red-500 p-3 rounded-3xl hover:bg-red-600">
        <BiSearch className="text-white" />
      </button>
    </form>
  );
};

export default HeaderSearch;
