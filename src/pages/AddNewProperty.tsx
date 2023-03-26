import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface IData {
  title: string;
  description: string;
  country: string;
  city: string;
  address: string;
  maxGuests: string;
  totalRooms: string;
  bathrooms: string;
  bedrooms: string;
  beds: string;
  price: string;
  propertyType: string;
  typeOfPlace: string;
  amenities: string[];
  images: FileList | null;
}

const AddNewProperty = () => {
  const [propertyData, setPropertyData] = useState<IData>({
    title: "",
    description: "",
    country: "",
    city: "",
    address: "",
    maxGuests: "",
    totalRooms: "",
    bathrooms: "",
    bedrooms: "",
    beds: "",
    price: "",
    propertyType: "",
    typeOfPlace: "",
    amenities: [],
    images: null,
  });
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.type == "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      const value = e.target.value;
      if (checked) {
        setPropertyData((prev) => {
          return { ...prev, amenities: [...prev.amenities, value] };
        });
      } else {
        setPropertyData((prev) => {
          return {
            ...prev,
            amenities: prev.amenities.filter((el) => el !== value),
          };
        });
      }
    } else if (e.target.type == "file") {
      const files = (e.target as HTMLInputElement).files;

      if (files?.length) {
        setPropertyData((prev) => {
          return { ...prev, images: files };
        });
      }
    } else {
      setPropertyData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsValid(true);
    if (Object.values(propertyData).some((el) => !el)) {
      setIsValid(false);
      return;
    } else {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")!);
      try {
        const propertyRes = await axios.post(
          `${BASE_URL}/property`,
          {
            createdBy: user._id,
            title: propertyData.title,
            description: propertyData.description,
            location: {
              country: propertyData.country,
              city: propertyData.city,
              address: propertyData.address,
            },
            maxGuests: propertyData.maxGuests,
            bedsQuantity: propertyData.beds,
            price: propertyData.price,
            amenities: propertyData.amenities,
            propertyType: propertyData.propertyType,
            typeOfPlace: propertyData.typeOfPlace,
            rooms: {
              total: propertyData.totalRooms,
              bedrooms: propertyData.bedrooms,
              bathrooms: propertyData.bathrooms,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formData = new FormData();
        const files = Array.from(propertyData.images!);
        for (let f of files) {
          formData.append("images", f);
        }
        const imageRes = await axios.post(
          `${BASE_URL}/images/${propertyRes.data._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/profile/properties");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-12">
      <h2 className="font-semibold text-xl">Add new property</h2>
      <form
        encType="multipart/form-data"
        className="w-full flex flex-col gap-8 items-center mt-12"
      >
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.title}
          name="title"
          className="border-[1px] border-black pl-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Title"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.country}
          name="country"
          className="border-[1px] border-black pl-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Country"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.city}
          name="city"
          className="border-[1px] border-black pl-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="City"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.address}
          name="address"
          className="border-[1px] border-black pl-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Address"
        />
        <textarea
          onChange={(e) => handleChange(e)}
          value={propertyData.description}
          name="description"
          rows={6}
          className="border-[1px] border-black pl-3 py-2 w-1/2 rounded-md"
          placeholder="Description"
        ></textarea>
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.maxGuests}
          name="maxGuests"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Max guest number"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.totalRooms}
          name="totalRooms"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Total rooms"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.bedrooms}
          name="bedrooms"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Number of bedrooms"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.bathrooms}
          name="bathrooms"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Number of bathrooms"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.beds}
          name="beds"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Number of beds"
        />
        <input
          onChange={(e) => handleChange(e)}
          value={propertyData.price}
          name="price"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
          type="text"
          placeholder="Price"
        />
        <select
          onChange={(e) => handleChange(e)}
          value={propertyData.propertyType}
          name="propertyType"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
        >
          <option value="" disabled hidden>
            Select property type
          </option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Guesthouse">Guesthouse</option>
          <option value="Hotel">Hotel</option>
        </select>
        <select
          onChange={(e) => handleChange(e)}
          value={propertyData.typeOfPlace}
          name="typeOfPlace"
          className="border-[1px] border-black px-3 py-2 w-1/2 rounded-md"
        >
          <option value="" disabled hidden>
            Select type of place
          </option>
          <option value="Entire place">Entire place</option>
          <option value="Private room">Private room</option>
          <option value="Shared room">Shared room</option>
        </select>
        <div className="flex flex-col w-1/2 flex-wrap">
          <h2 className="mb-6 font-semibold text-center">Choose amenities</h2>
          <div className="flex flex-wrap gap-6 ">
            <div className="flex gap-1 items-center">
              <label htmlFor="Internet">Internet</label>
              <input
                onChange={(e) => handleChange(e)}
                id="Internet"
                type="checkbox"
                value="Internet"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="Wifi">Wifi</label>
              <input
                onChange={(e) => handleChange(e)}
                id="Wifi"
                type="checkbox"
                value="Wifi"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="Air conditioning">Air conditioning</label>
              <input
                onChange={(e) => handleChange(e)}
                id="Air conditioning"
                type="checkbox"
                value="Air conditioning"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="Cable TV">Cable TV</label>
              <input
                onChange={(e) => handleChange(e)}
                id="Cable TV"
                type="checkbox"
                value="Cable TV"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="House security">House security</label>
              <input
                onChange={(e) => handleChange(e)}
                id="House security"
                type="checkbox"
                value="House security"
              />
            </div>
            <div className="flex gap-1 items-center">
              <label htmlFor="Parking place">Parking place</label>
              <input
                onChange={(e) => handleChange(e)}
                id="Parking place"
                type="checkbox"
                value="Parking place"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-1/2 flex-col items-center gap-5">
          <label className="font-medium">Select images</label>
          <input
            className="border-[1px] "
            accept="image/*"
            onChange={(e) => handleChange(e)}
            type="file"
            multiple
          />
        </div>
        {!isValid && (
          <span className="text-red-500">Please fill all fields!</span>
        )}
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-7 py-2 rounded-md text-white mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewProperty;
