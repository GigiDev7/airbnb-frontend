import React from "react";
import image from "/home.webp";

const Review = () => {
  return (
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
  );
};

export default Review;
