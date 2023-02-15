import { Suspense } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { useToggleWindow } from "../hooks/useWindow";
import ModalLayout from "../components/ModalLayout";
import Review from "../components/Review";
import ImagesSlider from "../components/ImagesSlider";
import { defer, Await, useLoaderData } from "react-router-dom";
import { catchError } from "../utils/httpErrorHelper";
import axios from "axios";
import { BASE_URL } from "../config";
import { IProperty } from "../interfaces";
import { makeReviewsPlural } from "../utils/makeStringPlural";
import ReserverForm from "../components/ReserverForm";
import ReviewSection from "../components/ReviewSection";

const SingleResultPage = () => {
  const amenitiesModal = useToggleWindow();
  const reviewsModal = useToggleWindow();
  const imageSlider = useToggleWindow();

  const data: any = useLoaderData();

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
                    <AiFillStar className="mr-1" />{" "}
                    {+property.avgRating.toFixed(1)}
                    <span className="ml-3">
                      {property.reviews.length}{" "}
                      {makeReviewsPlural(property.reviews)}
                    </span>
                  </h2>
                  {property.reviews.map((review) => (
                    <div className="mt-3" key={review._id}>
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
                  <AiFillStar /> {+property.avgRating.toFixed(1)}
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

              <ReserverForm property={property} />
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
            <ReviewSection
              property={property}
              showReviewModal={reviewsModal.showWindow}
            />
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
