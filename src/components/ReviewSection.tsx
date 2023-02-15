import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL } from "../config";
import AuthUserContext from "../context/authUserContext";
import { useToggleWindow } from "../hooks/useWindow";
import { IProperty } from "../interfaces";
import { makeReviewsPlural } from "../utils/makeStringPlural";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import Review from "./Review";
import { MouseEvent } from "react";

const ReviewSection = ({
  property,
  showReviewModal,
}: {
  property: IProperty;
  showReviewModal: (e: MouseEvent) => void;
}) => {
  const reviewBox = useToggleWindow();
  const userContext = useContext(AuthUserContext);

  const [reviewText, setReviewText] = useState("");
  const [reviewSucess, setReviewSuccess] = useState<null | boolean>(null);

  const handleReviewAdd = async () => {
    const token = localStorage.getItem("token");
    if (!reviewText || !token) return;

    setReviewSuccess(null);

    try {
      const { data } = await axios.post(
        `${BASE_URL}/reviews/property/${property._id}`,
        { review: reviewText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(null);
      }, 1500);
      reviewBox.hideWindow();
    } catch (error) {
      console.log(error);
      setReviewSuccess(false);
    }
  };

  return (
    <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
      <h2 className="font-semibold text-xl mb-8 flex items-center">
        <AiFillStar />
        {property.avgRating} - {property.reviews.length}{" "}
        {makeReviewsPlural(property.reviews)}
      </h2>
      {property.reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {property.reviews.slice(0, 5).map((review) => (
            <Review key={review._id} review={review} />
          ))}
        </div>
      )}
      <div className="flex flex-col w-fit">
        {property.reviews.length > 1 && (
          <button
            onClick={(e) => showReviewModal(e)}
            className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-8"
          >
            Show all {property.reviews.length}{" "}
            {makeReviewsPlural(property.reviews)}
          </button>
        )}
        {userContext.user && userContext.user._id != property.createdBy._id && (
          <button
            onClick={reviewBox.showWindow}
            className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-4"
          >
            Leave a review
          </button>
        )}
        {reviewSucess === false && (
          <p className="text-red-500 mt-2">
            Something went wrong, please try again later
          </p>
        )}
        {reviewSucess && (
          <p className="mt-2 text-green-600 font-semibold">
            Successfully added review!
          </p>
        )}
      </div>
      {reviewBox.isWindowShown && (
        <div className="flex gap-4 rounded-md w-fit mt-5">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            cols={50}
            placeholder="Leave your review..."
            className={`border-[1px] border-black pl-2 py-1`}
          ></textarea>
          <div className="flex gap-3">
            <MdCheckCircle
              onClick={handleReviewAdd}
              className="text-3xl text-green-600 hover:text-green-700 cursor-pointer"
            />
            <MdCancel
              onClick={reviewBox.hideWindow}
              className="text-3xl text-red-600 hover:text-red-700 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
