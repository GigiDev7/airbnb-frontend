import React, { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { IProperty } from "../interfaces";
import { BASE_URL } from "../config";
import { useImageSlide } from "../hooks/useImageSlide";
import { useLocation } from "react-router-dom";

const ResultCard: React.FC<{ property: IProperty }> = ({ property }) => {
  const { imageIndex, changeImageIndex } = useImageSlide(property.images);
  const location = useLocation();

  const handleImageChange = (e: MouseEvent, type: "prev" | "next") => {
    e.stopPropagation();
    e.preventDefault();
    changeImageIndex(type);
  };

  return (
    <Link
      to={`/property/${property._id}${location.search}`}
      target="_blank"
      className="flex flex-col  w-1/3 lg:w-1/5 relative icon-container"
    >
      <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <BsArrowLeftCircle
          onClick={(e) => handleImageChange(e, "prev")}
          className="text-black text-3xl cursor-pointer arrow-icon"
        />
        <BsArrowRightCircle
          onClick={(e) => handleImageChange(e, "next")}
          className="text-black text-3xl cursor-pointer arrow-icon"
        />
      </div>
      <AiOutlineHeart className="absolute right-2 top-2 text-2xl" />

      <img
        className="rounded-lg w-[28rem] h-96"
        src={`${BASE_URL}/${property.images[imageIndex]}`}
      />
      <div className="mt-2 flex justify-between">
        <div>
          <h2 className="font-semibold ">
            {property.location.city}, {property.location.country}
          </h2>
          <p>
            <span className="font-semibold">${property.price}</span> night
          </p>
        </div>
        <div>
          <p className="flex items-center">
            <AiFillStar /> <span>{property.avgRating}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
