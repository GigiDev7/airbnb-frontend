import React, { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { BsHouseDoor } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";

const FilterModal: React.FC<{ hideModal: () => void }> = ({ hideModal }) => {
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 0 });
  const [typeOfPlace, setTypeOfPlace] = useState({
    entire: false,
    private: false,
    shared: false,
  });
  const [rooms, setRooms] = useState({ bathrooms: 0, bedrooms: 0 });
  const [propertyType, setPropertyType] = useState({
    home: false,
    apartment: false,
    guesthouse: false,
    hotel: false,
  });

  const renderQuantities = (type: keyof typeof rooms) => {
    const arr = [...Array(9).keys()];

    const selectedClass = "text-white bg-black";

    return arr.map((item) => {
      return (
        <div
          onClick={(e) => handleRooms(e, type)}
          key={item}
          className={`border-[1px] px-6 py-1 rounded-xl cursor-pointer hover:border-black ${
            rooms[type] == item && selectedClass
          }`}
        >
          {item == 0 ? "Any" : item == 8 ? "8+" : item}
        </div>
      );
    });
  };

  const handlePriceRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof priceRange
  ) => {
    setPriceRange((prev) => {
      return { ...prev, [type]: e.target.value };
    });
  };

  const handleTypeOfPlace = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof typeOfPlace
  ) => {
    setTypeOfPlace((prev) => {
      return { ...prev, [type]: e.target.checked };
    });
  };

  const handleRooms = (e: any, type: keyof typeof rooms) => {
    let value = e.target.innerHTML;
    if (value == "Any") value = 0;
    if (value == "8+") value = 8;
    value *= 1;
    setRooms((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handlePropertyType = (type: keyof typeof propertyType) => {
    setPropertyType((prev) => {
      return { ...prev, [type]: !prev[type] };
    });
  };

  const handleClear = () => {
    setRooms({ bathrooms: 0, bedrooms: 0 });
    setPriceRange({ minPrice: 0, maxPrice: 0 });
    setTypeOfPlace({
      entire: false,
      private: false,
      shared: false,
    });
    setPropertyType({
      home: false,
      apartment: false,
      guesthouse: false,
      hotel: false,
    });
  };

  return (
    <ModalLayout closeModal={hideModal}>
      <h2 className="mt-5 border-b-[1px] w-full text-center pb-5">Filters</h2>

      <div className="flex flex-col w-full mt-4">
        <h2 className="text-xl font-bold mb-4">Price range</h2>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="flex flex-col border-[2px] flex-1 py-1 pl-2 rounded-lg">
            <label className="text-gray-500 text-sm">min price</label>
            <p>
              <span className="mr-1">$</span>
              <input
                value={priceRange.minPrice}
                onChange={(e) => handlePriceRange(e, "minPrice")}
                className="outline-0"
                type="text"
              />
            </p>
          </div>
          <span className="flex-2 mx-5">-</span>
          <div className="flex flex-col border-[2px] flex-1 py-1 pl-2 rounded-lg">
            <label className="text-gray-500 text-sm">max price</label>
            <p>
              <span className="mr-1">$</span>
              <input
                onChange={(e) => handlePriceRange(e, "maxPrice")}
                value={priceRange.maxPrice}
                className="outline-0"
                type="text"
              />
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-4">
        <h2 className="text-xl font-bold mb-4">Type of place</h2>
        <div className="flex flex-col lg:flex-row flex-wrap gap-4">
          <div className="flex ">
            <input
              checked={typeOfPlace.entire}
              onChange={(e) => handleTypeOfPlace(e, "entire")}
              className="w-6 h-6 mr-2"
              type="checkbox"
            />
            <div className="flex flex-col">
              <label>Entire place</label>
              <p className="text-gray-500">A place all to yourself</p>
            </div>
          </div>
          <div className="flex ">
            <input
              checked={typeOfPlace.private}
              onChange={(e) => handleTypeOfPlace(e, "private")}
              className="w-6 h-6 mr-2"
              type="checkbox"
            />
            <div className="flex flex-col">
              <label>Private room</label>
              <p className="text-gray-500">
                Your own room in a home or a hotel, plus some shared common
                spaces
              </p>
            </div>
          </div>
          <div className="flex">
            <input
              checked={typeOfPlace.shared}
              onChange={(e) => handleTypeOfPlace(e, "shared")}
              className="w-6 h-6 mr-2"
              type="checkbox"
            />
            <div className="flex flex-col">
              <label>Shared room</label>
              <p className="text-gray-500">
                A sleeping space and common areas that may be shared with others
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
          <div
            onClick={() => handlePropertyType("home")}
            className={`flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black ${
              propertyType.home && "border-black"
            }`}
          >
            <BsHouseDoor className="text-xl" />
            <p>House</p>
          </div>
          <div
            onClick={() => handlePropertyType("apartment")}
            className={`flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black ${
              propertyType.apartment && "border-black"
            }`}
          >
            <BiBuildingHouse className="text-xl" />
            <p>Apartment</p>
          </div>
          <div
            onClick={() => handlePropertyType("guesthouse")}
            className={`flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black ${
              propertyType.guesthouse && "border-black"
            }`}
          >
            <GiFamilyHouse className="text-xl" />
            <p>Guesthouse</p>
          </div>
          <div
            onClick={() => handlePropertyType("hotel")}
            className={`flex flex-col gap-8 border-[1px] py-5 pl-5 w-2/5 lg:w-1/5 rounded-xl cursor-pointer hover:border-black ${
              propertyType.hotel && "border-black"
            }`}
          >
            <FaHotel className="text-xl" />
            <p>Hotel</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full mt-5 border-t-[1px] py-5 sticky bottom-0 z-50 bg-white">
        <button
          onClick={handleClear}
          className="border-b-2 border-black hover:text-gray-600"
        >
          Clear all
        </button>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900">
          Filter
        </button>
      </div>
    </ModalLayout>
  );
};

export default FilterModal;
