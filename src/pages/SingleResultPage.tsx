import { Suspense } from "react";
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
import { defer, Await, useLoaderData } from "react-router-dom";
import { catchError } from "../utils/httpErrorHelper";
import axios from "axios";
import { BASE_URL } from "../config";

const SingleResultPage = () => {
  const amenitiesModal = useToggleWindow();
  const reviewsModal = useToggleWindow();
  const imageSlider = useToggleWindow();
  const quantityWindow = useToggleWindow();

  const data: any = useLoaderData();

  const { guestQuantity, decreaseQuantity, increaseQuantity, sumOfQuantities } =
    useGuestQuantity(1);

  return (
    <Suspense
      fallback={<p className="text-center mt-28 font-medum">Loading...</p>}
    >
      <Await resolve={data.property}>
        {(property) => (
          <div className="mt-28 pb-16">
            {amenitiesModal.isWindowShown && (
              <ModalLayout closeModal={amenitiesModal.hideWindow}>
                <div className="self-start mt-16 w-full">
                  <h2 className="font-medium text-2xl mb-8">
                    What this place offers
                  </h2>
                  <ul className="flex flex-col gap-3">
                    <li className="border-b-[1px] pb-3">kitchen</li>
                  </ul>
                </div>
              </ModalLayout>
            )}
            {reviewsModal.isWindowShown && (
              <ModalLayout closeModal={reviewsModal.hideWindow}>
                <div className="self-start mt-16 w-full">
                  <h2 className="font-medium text-2xl mb-8 flex items-center">
                    <AiFillStar className="mr-1" /> 5{" "}
                    <span className="ml-3">100 reviews</span>
                  </h2>
                  <div>
                    <Review />
                  </div>
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
                <span>{property.reviews.length} reviews</span>
                <p>
                  {property.location.city},{property.location.country}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-8 lg:gap-4 mt-5 relative">
              <img
                onClick={imageSlider.showWindow}
                className="w-2/5 lg:h-80 lg:w-1/3 rounded-l-xl hover:opacity-[0.9] cursor-pointer"
                src={`${BASE_URL}/${property.images[0]}`}
              />
              <img
                onClick={imageSlider.showWindow}
                className="w-2/5 lg:h-80 lg:w-1/3 rounded-r-xl hover:opacity-[0.9] cursor-pointer"
                src={`${BASE_URL}/${property.images[1]}`}
              />
              <button
                onClick={imageSlider.showWindow}
                className="absolute flex items-center right-16 lg:right-64 bottom-5 p-2 rounded-xl hover:bg-gray-200 bg-white"
              >
                <MdOutlinePhotoSizeSelectLarge /> Show all photos
              </button>
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
                    {property.reviews.length} reviews
                  </span>
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col border-[2px] border-black p-2 rounded-md">
                    <label className="font-medium text-sm">check-in</label>
                    <input type="date" />
                  </div>
                  <div className="flex flex-col border-[2px] border-black p-2 rounded-md">
                    <label className="font-medium text-sm">checkout</label>
                    <input type="date" />
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
                    <GuestQuantityBox
                      data={Object.entries(guestQuantity)}
                      decreaseQuantity={decreaseQuantity}
                      increaseQuantity={increaseQuantity}
                      absoluteTop={350}
                    />
                  )}
                  <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white">
                    Reserve
                  </button>
                </div>
                <p className="border-t-2 pt-4 font-medium text-center">
                  Total $2000
                </p>
              </div>
            </div>

            <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
              <h2 className="font-semibold text-xl mb-4">Where you'll sleep</h2>
              <div className="border-[1px] pl-4 py-4 w-fit pr-8 rounded-xl flex flex-col gap-3">
                <BiBed />
                <h3 className="font-medium">Bedroom 1</h3>
                <p className="text-gray-600">1 queen bed</p>
              </div>
            </div>

            <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
              <h2 className="font-semibold text-xl mb-4">
                What this place offers
              </h2>
              <ul>
                <li>Kitchen</li>
                <li>Kitchen</li>
                <li>Kitchen</li>
                <li>Kitchen</li>
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
                {property.avgRating} - {property.reviews.length} reviews
              </h2>
              <Review />
              <button
                onClick={reviewsModal.showWindow}
                className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-8"
              >
                Show all {property.reviews.length} reviews
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
    console.log(data);
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
