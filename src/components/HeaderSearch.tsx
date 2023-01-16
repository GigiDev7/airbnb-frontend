import React, { MouseEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import GuestQuantity from "./GuestQuantity";

const HeaderSearch: React.FC<{ showForm: (e: MouseEvent) => void }> = ({
  showForm,
}) => {
  const [guestQuantity, setGuestQuantity] = useState({
    Adults: { placeholder: "Ages 13 or above", quantity: 0 },
    Children: { placeholder: "Ages 2-12", quantity: 0 },
    Infants: { placeholder: "Under 2", quantity: 0 },
    Pets: { placeholder: "", quantity: 0 },
  });

  const [isQuantityWindowShown, setIsQuantityWindowShown] = useState(false);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", hideWindow);
    };
  }, []);

  const sumOfQuantities = () => {
    let text = "";
    const sum =
      guestQuantity.Adults.quantity +
      guestQuantity.Children.quantity +
      guestQuantity.Infants.quantity;
    if (sum === 0) text = "Add guests";
    if (sum === 1) text = "1 guest";
    if (sum > 1) text = `${sum} guests`;

    if (guestQuantity.Pets.quantity === 1) text = `${text}, 1 pet`;
    if (guestQuantity.Pets.quantity > 1)
      text = `${text} ${guestQuantity.Pets.quantity} pets`;

    return text;
  };

  const hideWindow = () => {
    setIsQuantityWindowShown(false);
  };

  const showWindow = (e: MouseEvent) => {
    setIsQuantityWindowShown(true);
    e.stopPropagation();
    document.addEventListener("click", hideWindow);
  };

  const preserveOpenForm = (e: MouseEvent) => {
    showForm(e);
    hideWindow();
  };

  const increaseQuantity = (field: keyof typeof guestQuantity) => {
    setGuestQuantity((prev) => {
      return {
        ...prev,
        [field]: { ...prev[field], quantity: prev[field].quantity + 1 },
      };
    });
  };

  const decreaseQuantity = (field: keyof typeof guestQuantity) => {
    setGuestQuantity((prev) => {
      if (prev[field].quantity == 0) {
        return { ...prev };
      }

      return {
        ...prev,
        [field]: { ...prev[field], quantity: prev[field].quantity - 1 },
      };
    });
  };

  return (
    <form
      onClick={(e) => preserveOpenForm(e)}
      className="flex items-center border-2 p-2 rounded-3xl relative"
    >
      <div className="flex flex-col pl-2 ">
        <label>Where</label>
        <input
          type="text"
          className="outline-0 "
          placeholder="Search destinations"
        />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div className="flex flex-col">
        <label>Check in</label>
        <input type="date" className="outline-0 " placeholder="Add dates" />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div className="flex flex-col">
        <label>Check out</label>
        <input type="date" className="outline-0 " placeholder="Add dates" />
      </div>
      <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
      <div
        onClick={(e) => showWindow(e)}
        className="flex flex-col mr-6 cursor-pointer"
      >
        <h2>Who</h2>
        <p className="text-gray-400">{sumOfQuantities()}</p>
      </div>
      {isQuantityWindowShown && (
        <div
          onClick={(e) => e.stopPropagation()}
          className=" flex flex-col w-96 gap-6 absolute right-0 top-28 lg:top-20 shadow-2xl border-[1px] p-10 rounded-xl"
        >
          {Object.entries(guestQuantity).map((item, index) => (
            <GuestQuantity
              key={item[0]}
              field={item[0] as keyof typeof guestQuantity}
              fieldPlaceHolder={item[1].placeholder}
              quantity={item[1].quantity}
              last={index == Object.entries(guestQuantity).length - 1}
              increase={increaseQuantity}
              decrease={decreaseQuantity}
            />
          ))}
        </div>
      )}
      <button className="bg-red-500 p-3 rounded-3xl hover:bg-red-600">
        <BiSearch className="text-white" />
      </button>
    </form>
  );
};

export default HeaderSearch;
