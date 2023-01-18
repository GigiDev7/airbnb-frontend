import React, { useEffect, useRef } from "react";
import image from "/home.webp";
import { AiFillStar } from "react-icons/ai";

const SearchResults: React.FC = () => {
  const elRef = useRef<any>(null);

  useEffect(() => {
    const handler = () => {
      const maxHeight = document.body.offsetHeight - window.innerHeight;
      if (maxHeight - window.scrollY < 300) {
        console.log("works!");
        document.removeEventListener("scroll", handler);
      }
    };

    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="flex flex-wrap justify-center w-full gap-12 lg:gap-7 pb-12"
    >
      <div className="flex flex-col  w-1/3 lg:w-1/5">
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
      </div>
      <div className="flex justify-center w-1/3 lg:w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/3 lg:w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/3 lg:w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
      <div className="flex justify-center w-1/5">
        <img className="" src={image} />
      </div>
    </div>
  );
};

export default SearchResults;
