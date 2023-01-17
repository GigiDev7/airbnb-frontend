import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";

const FilterModal: React.FC<{ hideModal: () => void }> = ({ hideModal }) => {
  const [rooms, setRooms] = useState({ bathrooms: 0, bedrooms: 0 });

  const renderQuantities = (type: keyof typeof rooms) => {
    const arr = [...Array(9).keys()];

    const selectedClass = "text-white bg-black";

    return arr.map((item) => {
      return (
        <div
          key={item}
          className={`border-[1px] px-6 py-1 rounded-xl cursor-pointer hover:border-black ${
            rooms[type] === item && selectedClass
          }`}
        >
          {item === 0 ? "Any" : item === 8 ? "8+" : item}
        </div>
      );
    });
  };

  return (
    <>
      <div className="bg-[rgba(0,0,0,0.3)] fixed top-0 bottom-0 left-0 right-0 z-50"></div>
      <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/4 bg-white rounded-xl flex flex-col items-center px-6 overflow-auto pb-8">
        <AiOutlineClose
          onClick={hideModal}
          className="absolute left-5 top-5 cursor-pointer text-xl"
        />
        <h2 className="mt-5 border-b-[1px] w-full text-center pb-5">Filters</h2>

        <div className="flex flex-col w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Price range</h2>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex flex-col border-[2px] flex-1 py-1 pl-2 rounded-lg">
              <label className="text-gray-500 text-sm">min price</label>
              <p>
                <span className="mr-1">$</span>
                <input className="outline-0" type="text" />
              </p>
            </div>
            <span className="flex-2 mx-5">-</span>
            <div className="flex flex-col border-[2px] flex-1 py-1 pl-2 rounded-lg">
              <label className="text-gray-500 text-sm">max price</label>
              <p>
                <span className="mr-1">$</span>
                <input className="outline-0" type="text" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Type of place</h2>
          <div className="flex flex-col lg:flex-row flex-wrap gap-4">
            <div className="flex ">
              <input className="w-6 h-6 mr-2" type="checkbox" />
              <div className="flex flex-col">
                <label>Entire place</label>
                <p className="text-gray-500">A place all to yourself</p>
              </div>
            </div>
            <div className="flex ">
              <input className="w-6 h-6 mr-2" type="checkbox" />
              <div className="flex flex-col">
                <label>Private room</label>
                <p className="text-gray-500">
                  Your own room in a home or a hotel, plus some shared common
                  spaces
                </p>
              </div>
            </div>
            <div className="flex">
              <input className="w-6 h-6 mr-2" type="checkbox" />
              <div className="flex flex-col">
                <label>Shared room</label>
                <p className="text-gray-500">
                  A sleeping space and common areas that may be shared with
                  others
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Rooms and beds</h2>
          <div>
            <div className="flex flex-col">
              <h3 className="text-gray-600 mb-3">Bedrooms</h3>
              <div className="flex  gap-2 flex-wrap ">
                {renderQuantities("bedrooms")}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-gray-600 my-3">Bathrooms</h3>
              <div className="flex flex-wrap gap-2">
                {renderQuantities("bathrooms")}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Property type</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black">
              <BsHouseDoor />
              <p>House</p>
            </div>
            <div className="flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black">
              <BiBuildingHouse />
              <p>Apartment</p>
            </div>
            <div className="flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black">
              <GiFamilyHouse />
              <p>Guesthouse</p>
            </div>
            <div className="flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black">
              <FaHotel />
              <p>Hotel</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
