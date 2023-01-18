import React from "react";
import image from "/home.webp";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const ResultCard = () => {
  return (
    <Link
      to={`/property/id`}
      target="_blank"
      className="flex flex-col  w-1/3 lg:w-1/5 relative icon-container"
    >
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <BsArrowLeftCircle className="text-white text-2xl cursor-pointer arrow-icon" />
        <BsArrowRightCircle className="text-white text-2xl cursor-pointer arrow-icon" />
      </div>
      <AiOutlineHeart className="absolute right-2 top-2 text-2xl" />

      <img className="rounded-lg" src={image} />
      <div className="mt-2 flex justify-between">
        <div>
          <h2 className="font-semibold ">Tbilisi, Georgia</h2>
          <p>
            <span className="font-semibold">$300</span> night
          </p>
        </div>
        <div>
          <p className="flex items-center">
            <AiFillStar /> <span>5.0</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
