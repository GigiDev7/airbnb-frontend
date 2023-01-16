import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const GuestQuantity: React.FC<{
  field: "Adults" | "Children" | "Infants" | "Pets";
  fieldPlaceHolder: string;
  quantity: number;
  last: boolean;
  increase: (field: "Adults" | "Children" | "Infants" | "Pets") => void;
  decrease: (field: "Adults" | "Children" | "Infants" | "Pets") => void;
}> = ({ field, fieldPlaceHolder, quantity, last, decrease, increase }) => {
  return (
    <div
      className={`flex ${
        !last && "border-b-[1px] pb-2"
      } items-center justify-between`}
    >
      <div className="flex flex-col">
        <h2>{field}</h2>
        <p className="text-gray-500">{fieldPlaceHolder}</p>
      </div>
      <div className="flex items-center">
        <div
          onClick={() => decrease(field)}
          className="cursor-pointer p-3 border-[1px] rounded-3xl"
        >
          <AiOutlineMinus className={`${quantity === 0 && "text-gray-500"}`} />
        </div>
        <span className="mx-3">{quantity}</span>
        <div
          onClick={() => increase(field)}
          className={`cursor-pointer p-3 border-[1px] rounded-3xl`}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default GuestQuantity;
