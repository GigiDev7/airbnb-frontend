import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useToggleWindow } from "../hooks/useWindow";
import { useGuestQuantity } from "../hooks/useGuestQuantity";
import GuestQuantityBox from "./GuestQuantityBox";
import { redirect, useSubmit, useLocation } from "react-router-dom";
import { capitalize } from "../utils/capitalize";

const HeaderSearch: React.FC<{ showForm: (e: MouseEvent) => void }> = ({
  showForm,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
  });

  const {
    isWindowShown: isQuantityWindowShown,
    hideWindow,
    showWindow,
  } = useToggleWindow(true);

  const {
    guestQuantity,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity,
    sumOfQuantities,
  } = useGuestQuantity();

  const preserveOpenForm = (e: MouseEvent) => {
    showForm(e);
    hideWindow();
  };

  const submit = useSubmit();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get("city");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const infants = searchParams.get("infants");
    const pets = searchParams.get("pets");
    setFormData({
      destination: city || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
    });
    updateQuantity({
      adults: adults ? +adults : 0,
      children: children ? +children : 0,
      infants: infants ? +infants : 0,
      pets: pets ? +pets : 0,
    });
  }, []);

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    setIsValid(true);
    const data = {
      destination: formData.destination,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: {
        Adults: guestQuantity.Adults.quantity,
        Children: guestQuantity.Children.quantity,
        Infants: guestQuantity.Infants.quantity,
        Pets: guestQuantity.Pets.quantity,
      },
    };

    if (
      ![data.destination, data.checkIn, data.checkOut].every((el) => el) ||
      ![
        data.guests.Adults,
        data.guests.Children,
        data.guests.Infants,
        data.guests.Pets,
      ].some((el) => el)
    ) {
      setIsValid(false);
      return;
    }

    submit(
      { formData: JSON.stringify(data) },
      { method: "post", action: "/property" }
    );
  };

  return (
    <>
      {!isValid && (
        <h1 className="text-center text-red-500">Please fill all fields</h1>
      )}
      <form
        method="post"
        action="/property"
        onClick={(e) => preserveOpenForm(e)}
        className="flex items-center border-2 p-2 rounded-3xl relative"
      >
        <div className="flex flex-col pl-2 ">
          <label>Where</label>
          <input
            onChange={(e) => handleInputChange(e)}
            value={formData.destination}
            name="destination"
            type="text"
            className="outline-0 "
            placeholder="Search destinations"
          />
        </div>
        <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
        <div className="flex flex-col">
          <label>Check in</label>
          <input
            onChange={(e) => handleInputChange(e)}
            value={formData.checkIn}
            name="checkIn"
            type="date"
            className="outline-0 "
            placeholder="Add dates"
          />
        </div>
        <span className="mx-2 text-gray-400 text-lg">&#9474;</span>
        <div className="flex flex-col">
          <label>Check out</label>
          <input
            onChange={(e) => handleInputChange(e)}
            value={formData.checkOut}
            name="checkOut"
            type="date"
            className="outline-0 "
            placeholder="Add dates"
          />
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
          <GuestQuantityBox
            data={Object.entries(guestQuantity)}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
          />
        )}
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-red-500 p-3 rounded-3xl hover:bg-red-600"
        >
          <BiSearch className="text-white" />
        </button>
      </form>
    </>
  );
};

export async function action({ request }: { request: any }) {
  const data: FormData = await request.formData();
  const formData: any = data.get("formData");
  const { destination, checkIn, checkOut, guests } = JSON.parse(formData);
  const { Adults, Children, Infants, Pets } = guests;

  const params = new URLSearchParams();
  params.append("city", capitalize(destination.toLowerCase()));
  params.append("checkIn", checkIn);
  params.append("checkOut", checkOut);
  params.append("adults", Adults);
  params.append("children", Children), params.append("infants", Infants);
  params.append("pets", Pets);

  return redirect(`/property?${params}`);
}

export default HeaderSearch;
