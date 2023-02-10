import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import { BASE_URL } from "../config";
import { useImageSlide } from "../hooks/useImageSlide";

const ImagesSlider: React.FC<{ closeModal: () => void; images: string[] }> = ({
  closeModal,
  images,
}) => {
  const { imageIndex, changeImageIndex } = useImageSlide(images);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div className="bg-black z-50 fixed top-0 bottom-0 left-0 right-0"></div>
      <div className="z-50 fixed top-10 flex justify-between w-[45%]">
        <button onClick={closeModal} className="text-white flex items-center">
          <AiOutlineClose className="mr-2" /> Close
        </button>
        <p className="text-white">
          {imageIndex + 1}/{images.length}
        </p>
      </div>
      <div className="z-50 fixed right-20 top-1/2">
        <BsArrowRightCircle
          onClick={() => changeImageIndex("next")}
          className="text-white text-4xl cursor-pointer"
        />
      </div>
      <div className="z-50 fixed left-20 top-1/2">
        <BsArrowLeftCircle
          onClick={() => changeImageIndex("prev")}
          className="text-white text-4xl cursor-pointer"
        />
      </div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <img className="h-[500px]" src={`${BASE_URL}/${images[imageIndex]}`} />
      </div>
    </>
  );
};

export default ImagesSlider;
