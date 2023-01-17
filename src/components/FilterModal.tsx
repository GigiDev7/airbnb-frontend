import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FilterModal: React.FC = () => {
  return (
    <div className="flex items-center w-full h-full absolute justify-center">
      <div className="bg-[rgba(0,0,0,0.3)] fixed top-0 bottom-0 left-0 right-0 z-50"></div>
      <div className="relative z-50 w-1/2 h-3/4 bg-white rounded-xl flex flex-col items-center px-6">
        <AiOutlineClose className="absolute left-5 top-5 cursor-pointer text-xl" />
        <h2 className="mt-5 border-b-[1px] w-full text-center pb-5">Filters</h2>

        <div className="flex flex-col w-full mt-4">
          <h2 className="text-xl font-bold mb-4">Price range</h2>
          <div className="flex justify-between items-center">
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
      </div>
    </div>
  );
};

export default FilterModal;
