import React from "react";
import { AiFillStar } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import image from "/home.webp";

const SingleResultPage = () => {
  return (
    <div className="mt-16 pb-16">
      <div>
        <h1 className="text-2xl font-semibold">
          NEST Bunnefjorden - Mirrored Glass Cabin
        </h1>
        <div className="flex items-center font-medium gap-4 mt-1">
          <span className="flex items-center">
            <AiFillStar /> 4.8
          </span>
          <span>100 reviews</span>
          <p>Viken,Norway</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 lg:gap-4 mt-5 relative">
        <img
          className="w-2/5 lg:h-80 lg:w-1/3 rounded-l-xl hover:opacity-[0.9] cursor-pointer"
          src={image}
        />
        <img
          className="w-2/5 lg:h-80 lg:w-1/3 rounded-r-xl hover:opacity-[0.9] cursor-pointer"
          src={image}
        />
        <button className="absolute flex items-center right-16 lg:right-64 bottom-5 p-2 rounded-xl hover:bg-gray-200 bg-white">
          <MdOutlinePhotoSizeSelectLarge /> Show all photos
        </button>
      </div>

      <div className="mt-8 border-b-[1px] pb-12 flex justify-between lg:w-4/5 lg:mx-auto">
        <div>
          <h2 className="font-semibold text-xl">
            Tiny home hosted by Frederik
          </h2>
          <p className="text-gray-600 flex">
            4 guests 2 bedrooms 2 beds 1 bath
          </p>
        </div>
        <div className="flex flex-col border-2 rounded-xl py-12 px-20 gap-4">
          <h2 className="font-semibold text-lg">
            $400 <span className="font-normal">night</span>
          </h2>
          <h3 className="flex items-center font-semibold">
            <AiFillStar /> 5{" "}
            <span className="ml-2 text-gray-600 font-medium">100 reviews</span>
          </h3>
          <div className="flex flex-col gap-3">
            <input type="date" />
            <input type="date" />
            <p>guests form</p>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white">
              Reserve
            </button>
          </div>
          <p className="border-t-2 pt-4 font-medium text-center">Total $2000</p>
        </div>
      </div>

      <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
        <h2 className="font-semibold text-xl mb-4">Where you'll sleep</h2>
        <div className="border-[1px] pl-4 py-4 w-fit pr-8 rounded-xl flex flex-col gap-3">
          <BiBed />
          <h3 className="font-medium">Bedroom 1</h3>
          <p className="text-gray-600">1 queen bed</p>
        </div>
      </div>

      <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
        <h2 className="font-semibold text-xl mb-4">What this place offers</h2>
        <ul>
          <li>Kitchen</li>
          <li>Kitchen</li>
          <li>Kitchen</li>
          <li>Kitchen</li>
        </ul>
        <button className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-5">
          Show all 40 amenities
        </button>
      </div>

      <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
        <h2 className="font-semibold text-xl mb-8 flex items-center">
          <AiFillStar /> 100 reviews
        </h2>
        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 h-12 rounded-3xl" src={image} />
            <div>
              <h2 className="font-medium">Christor</h2>
              <p className="text-gray-600">January 2023</p>
            </div>
          </div>
          <p className="mt-4">All great!</p>
        </div>
        <button className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-8">
          Show all 100 reviews
        </button>
      </div>
    </div>
  );
};

export default SingleResultPage;
