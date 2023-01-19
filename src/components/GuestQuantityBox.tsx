import React from "react";
import GuestQuantity from "./GuestQuantity";

const GuestQuantityBox: React.FC<{
  data: any;
  increaseQuantity: (field: "Adults" | "Children" | "Infants" | "Pets") => void;
  decreaseQuantity: (field: "Adults" | "Children" | "Infants" | "Pets") => void;
  absoluteTop?: number;
}> = ({ data, decreaseQuantity, increaseQuantity, absoluteTop }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex flex-col w-96 gap-6 absolute right-0 ${
        absoluteTop ? `top-[${absoluteTop}px]` : "top-24 lg:top-20"
      }  shadow-2xl border-[1px] p-10 rounded-xl z-50 bg-white`}
    >
      {data.map((item: any, index: any) => (
        <GuestQuantity
          key={item[0]}
          field={item[0]}
          fieldPlaceHolder={item[1].placeholder}
          quantity={item[1].quantity}
          last={index == data.length - 1}
          increase={increaseQuantity}
          decrease={decreaseQuantity}
        />
      ))}
    </div>
  );
};

export default GuestQuantityBox;
