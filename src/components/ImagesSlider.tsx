import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";
import image from "/home.webp";

const ImagesSlider: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <>
      <div className="bg-black z-50 fixed top-0 bottom-0 left-0 right-0"></div>
      <div className="z-50 absolute top-10 flex justify-between w-[45%]">
        <button onClick={closeModal} className="text-white flex items-center">
          <AiOutlineClose className="mr-2" /> Close
        </button>
        <p className="text-white">1/25</p>
      </div>
      <div className="z-50 absolute right-20 top-1/2">
        <BsArrowRightCircle className="text-white text-4xl cursor-pointer" />
      </div>
      <div className="z-50 absolute left-20 top-1/2">
        <BsArrowLeftCircle className="text-white text-4xl cursor-pointer" />
      </div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <img className="h-[500px]" src={image} />
      </div>
    </>
  );
};

export default ImagesSlider;
