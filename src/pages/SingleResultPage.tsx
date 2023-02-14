import { Suspense, useEffect, useState, ChangeEvent } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { useToggleWindow } from "../hooks/useWindow";
import ModalLayout from "../components/ModalLayout";
import Review from "../components/Review";
import ImagesSlider from "../components/ImagesSlider";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useGuestQuantity } from "../hooks/useGuestQuantity";
import GuestQuantityBox from "../components/GuestQuantityBox";
import { defer, Await, useLoaderData, useLocation } from "react-router-dom";
import { catchError } from "../utils/httpErrorHelper";
import axios from "axios";
import { BASE_URL } from "../config";
import { IProperty } from "../interfaces";
import { calcDaysBetweenDates } from "../utils/calcDaysBetweenDates";
import { makeReviewsPlural } from "../utils/makeStringPlural";
import DateInput from "../components/DateInput";

const SingleResultPage = () => {
  const amenitiesModal = useToggleWindow();
  const reviewsModal = useToggleWindow();
  const imageSlider = useToggleWindow();
  const quantityWindow = useToggleWindow();

  const data: any = useLoaderData();
  const location = useLocation();
  const [reserveDates, setReserverDates] = useState({
    checkIn: "",
    checkOut: "",
  });

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

  const {
    guestQuantity,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity,
    sumOfQuantities,
  } = useGuestQuantity(1);

  return (
    <Suspense
      fallback={<p className="text-center mt-28 font-medum">Loading...</p>}
    >
      <Await resolve={data.property}>
        {(property: IProperty) => (
          <div className="mt-28 pb-16">
            {amenitiesModal.isWindowShown && (
              <ModalLayout closeModal={amenitiesModal.hideWindow}>
                <div className="self-start mt-16 w-full">
                  <h2 className="font-medium text-2xl mb-8">
                    What this place offers
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {property.amenities.map((item) => (
                      <li key={item} className="border-b-[1px] pb-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ModalLayout>
            )}
            {reviewsModal.isWindowShown && (
              <ModalLayout closeModal={reviewsModal.hideWindow}>
                <div className="self-start mt-16 w-full">
                  <h2 className="font-medium text-2xl mb-8 flex items-center">
                    <AiFillStar className="mr-1" /> {property.avgRating}
                    <span className="ml-3">
                      {property.reviews.length}{" "}
                      {makeReviewsPlural(property.reviews)}
                    </span>
                  </h2>
                  {property.reviews.map((review) => (
                    <div key={review._id}>
                      <Review review={review} />
                    </div>
                  ))}
                </div>
              </ModalLayout>
            )}
            {imageSlider.isWindowShown && (
              <ImagesSlider
                images={property.images}
                closeModal={imageSlider.hideWindow}
              />
            )}
            <div>
              <h1 className="text-2xl font-semibold">{property.title}</h1>
              <div className="flex items-center font-medium gap-4 mt-1">
                <span className="flex items-center">
                  <AiFillStar /> {property.avgRating}
                </span>
                <span>
                  {property.reviews.length}{" "}
                  {makeReviewsPlural(property.reviews)}
                </span>
                <p>
                  {property.location.city},{property.location.country}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-8 lg:gap-4 mt-5 relative">
              <img
                className="w-2/5 h-80 lg:w-1/4 rounded-l-xl"
                src={`${BASE_URL}/${property.images[0]}`}
              />
              {property.images[1] && (
                <img
                  className="w-2/5 h-80 lg:w-1/4 rounded-r-xl"
                  src={`${BASE_URL}/${property.images[1]}`}
                />
              )}
              {property.images.length > 1 && (
                <button
                  onClick={imageSlider.showWindow}
                  className="absolute flex items-center right-16 lg:right-[22rem] bottom-5 p-2 rounded-xl hover:bg-gray-200 bg-white"
                >
                  <MdOutlinePhotoSizeSelectLarge /> Show all photos
                </button>
              )}
            </div>

            <div className="mt-8 border-b-[1px] pb-12 flex justify-between lg:w-4/5 lg:mx-auto">
              <div>
                <h2 className="font-semibold text-xl w-4/5 mb-3">
                  {property.description}
                </h2>
                <p className="text-gray-600 flex">
                  {property.maxGuests} guests {property.rooms.bedrooms} bedrooms{" "}
                  {property.bedsQuantity} beds {property.rooms.bathrooms} bath
                </p>
              </div>
              <div className="flex flex-col relative border-2 rounded-xl py-12 px-20 gap-4">
                <h2 className="font-semibold text-lg">
                  ${property.price} <span className="font-normal">night</span>
                </h2>
                <h3 className="flex items-center font-semibold">
                  <AiFillStar /> {property.avgRating}
                  <span className="ml-2 text-gray-600 font-medium">
                    {property.reviews.length}{" "}
                    {makeReviewsPlural(property.reviews)}
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
                    {quantityWindow.isWindowShown ? (
                      <SlArrowUp />
                    ) : (
                      <SlArrowDown />
                    )}
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
                  <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white">
                    Reserve
                  </button>
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
            </div>

            <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
              <h2 className="font-semibold text-xl mb-4">Where you'll sleep</h2>
              <div className="flex gap-6">
                {[...Array(property.rooms.bedrooms).keys()].map(
                  (item, index) => (
                    <div
                      key={index}
                      className="border-[1px] pl-4 py-4 w-fit pr-8 rounded-xl flex flex-col gap-3"
                    >
                      <BiBed />
                      <h3 className="font-medium">Bedroom {item + 1}</h3>
                      <p className="text-gray-600">1 queen bed</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
              <h2 className="font-semibold text-xl mb-4">
                What this place offers
              </h2>
              <ul>
                {property.amenities.slice(0, 8).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                onClick={amenitiesModal.showWindow}
                className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-5"
              >
                Show all {property.amenities.length} amenities
              </button>
            </div>

            <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
              <h2 className="font-semibold text-xl mb-8 flex items-center">
                <AiFillStar />
                {property.avgRating} - {property.reviews.length}{" "}
                {makeReviewsPlural(property.reviews)}
              </h2>
              {property.reviews.slice(0, 5).map((review) => (
                <Review key={review._id} review={review} />
              ))}
              <button
                onClick={reviewsModal.showWindow}
                className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-8"
              >
                Show all {property.reviews.length}{" "}
                {makeReviewsPlural(property.reviews)}
              </button>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

async function getProperty(url: string) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return catchError(error);
  }
}

export function loader({ request, params }: { request: any; params: any }) {
  const url = `${BASE_URL}/property/${params.propertyId}`;
  return defer({
    property: getProperty(url),
  });
}

export default SingleResultPage;
