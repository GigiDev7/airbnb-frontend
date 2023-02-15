import { useState, useEffect } from "react";
import { IProperty } from "../interfaces";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import GuestQuantityBox from "../components/GuestQuantityBox";
import DateInput from "../components/DateInput";
import { AiFillStar } from "react-icons/ai";
import { useToggleWindow } from "../hooks/useWindow";
import { calcDaysBetweenDates } from "../utils/calcDaysBetweenDates";
import { makeReviewsPlural } from "../utils/makeStringPlural";
import { useGuestQuantity } from "../hooks/useGuestQuantity";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ReserverForm = ({ property }: { property: IProperty }) => {
  const [reserveDates, setReserverDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [reserveDateError, setReserverDateError] = useState(false);

  const location = useLocation();
  const {
    guestQuantity,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity,
    sumOfQuantities,
  } = useGuestQuantity(1);

  const quantityWindow = useToggleWindow();

  const differenceBetweenDates = calcDaysBetweenDates(
    new Date(reserveDates.checkIn),
    new Date(reserveDates.checkOut)
  );

  const handleDateChange = (
    newVal: string,
    type: keyof typeof reserveDates
  ) => {
    setReserverDates((prev) => {
      return { ...prev, [type]: newVal };
    });
  };

  const handleReserve = () => {
    setReserverDateError(false);
    let isValid = true;
    for (let b of property.bookings) {
      if (
        moment(reserveDates.checkIn).isBetween(
          moment(b.checkIn),
          moment(b.checkOut)
        ) ||
        moment(reserveDates.checkOut).isBetween(
          moment(b.checkIn),
          moment(b.checkOut)
        ) ||
        moment(b.checkIn).isBetween(
          moment(reserveDates.checkIn),
          moment(reserveDates.checkOut)
        ) ||
        moment(b.checkIn).isBetween(
          moment(reserveDates.checkIn),
          moment(reserveDates.checkOut)
        ) ||
        moment(reserveDates.checkOut).isBefore(moment(reserveDates.checkIn))
      ) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      setReserverDateError(true);
      return;
    } else {
      console.log("success");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    const pets = searchParams.get("pets");
    if (checkIn && checkOut) {
      setReserverDates({ checkIn, checkOut });
    }
    updateQuantity({
      adults: adults ? +adults : 0,
      children: children ? +children : 0,
      infants: infants ? +infants : 0,
      pets: pets ? +pets : 0,
    });
  }, []);

  return (
    <div className="flex flex-col relative border-2 rounded-xl py-12 px-20 gap-4">
      <h2 className="font-semibold text-lg">
        ${property.price} <span className="font-normal">night</span>
      </h2>
      <h3 className="flex items-center font-semibold">
        <AiFillStar /> {+property.avgRating.toFixed(1)}
        <span className="ml-2 text-gray-600 font-medium">
          {property.reviews.length} {makeReviewsPlural(property.reviews)}
        </span>
      </h3>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border-[2px] border-black p-2 rounded-md">
          <label className="font-medium text-sm mb-2">check-in</label>
          <DateInput
            value={reserveDates.checkIn}
            type="checkIn"
            handleChange={handleDateChange}
            property={property}
          />
        </div>
        <div className="w-44 flex flex-col border-[2px] border-black p-2 rounded-md">
          <label className="font-medium text-sm mb-2">checkout</label>
          <DateInput
            value={reserveDates.checkOut}
            type="checkOut"
            handleChange={handleDateChange}
            property={property}
          />
        </div>
        <div
          onClick={quantityWindow.toggleWindow}
          className="flex items-center justify-between border-[2px] border-black rounded-lg p-2 cursor-pointer"
        >
          <div className="flex flex-col ">
            <h3 className="text-[10px] font-medium">GUESTS</h3>
            <p>{sumOfQuantities()}</p>
          </div>
          {quantityWindow.isWindowShown ? <SlArrowUp /> : <SlArrowDown />}
        </div>
        {quantityWindow.isWindowShown && (
          <div>
            <GuestQuantityBox
              data={Object.entries(guestQuantity)}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              absoluteTop={100}
            />
          </div>
        )}
        <button
          onClick={handleReserve}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white"
        >
          Reserve
        </button>

        {reserveDateError && (
          <p className="text-red-500">Please select valid dates</p>
        )}
      </div>
      <p className="border-t-2 pt-4 font-medium text-center">
        Total{" "}
        {differenceBetweenDates &&
        differenceBetweenDates * property.price > 0 &&
        !isNaN(differenceBetweenDates * property.price)
          ? differenceBetweenDates * property.price
          : 0}
        $
      </p>
    </div>
  );
};

export default ReserverForm;
