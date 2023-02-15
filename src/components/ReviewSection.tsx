import axios from "axios";
import { useContext, useState, useRef } from "react";
import { BASE_URL } from "../config";
import AuthUserContext from "../context/authUserContext";
import { useToggleWindow } from "../hooks/useWindow";
import { IProperty } from "../interfaces";
import { makeReviewsPlural } from "../utils/makeStringPlural";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
  const ratingBox = useToggleWindow();
  const userContext = useContext(AuthUserContext);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewSucess, setReviewSuccess] = useState<null | boolean>(null);
  const [ratingSucess, setRatingSuccess] = useState<null | boolean>(null);
  const ratingRef = useRef(0);

  const updateRating = (rtng: number) => {
    setRating(rtng);
    ratingRef.current = rtng;
  };

  const openBox = (e: MouseEvent, type: "review" | "rating") => {
    if (type == "rating") {
      reviewBox.hideWindow();
      ratingBox.showWindow(e);
    } else {
      ratingBox.hideWindow();
      reviewBox.showWindow(e);
    }
  };

  const handleAdd = async (type: "rating" | "review") => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (type === "rating" && !rating) return;
    if (type === "review" && !reviewText) return;
    if (type === "rating") setRatingSuccess(null);
    if (type === "review") setReviewSuccess(null);

    const postData = type === "rating" ? { rating } : { review: reviewText };

    try {
      const { data } = await axios.post(
        `${BASE_URL}/${type}s/property/${property._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      type === "rating" ? setRatingSuccess(true) : setReviewSuccess(true);
      setTimeout(() => {
        type === "rating" ? setRatingSuccess(null) : setReviewSuccess(null);
      }, 1500);
      type === "rating" ? ratingBox.hideWindow() : reviewBox.hideWindow();
    } catch (error) {
      console.log(error);
      type === "rating" ? setRatingSuccess(false) : setReviewSuccess(false);
    }
  };

  return (
    <div className="mt-8 border-b-[1px] pb-12 lg:w-4/5 lg:mx-auto">
      <h2 className="font-semibold text-xl mb-8 flex items-center">
        <AiFillStar />
        {+property.avgRating.toFixed(1)} - {property.reviews.length}{" "}
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
          <div className="flex gap-4">
            <button
              onClick={(e) => openBox(e, "review")}
              className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-4"
            >
              Leave a review
            </button>
            <button
              onClick={(e) => openBox(e, "rating")}
              className="border-[1px] border-black rounded-lg px-5 py-2 font-medium mt-4"
            >
              Leave rating
            </button>
          </div>
        )}
        {reviewSucess === false ||
          (ratingSucess === false && (
            <p className="text-red-500 mt-2">
              Something went wrong, please try again later
            </p>
          ))}
        {reviewSucess ||
          (ratingSucess && (
            <p className="mt-2 text-green-600 font-semibold">
              Successfully added {reviewSucess ? "review" : "rating"}!
            </p>
          ))}
      </div>
      {ratingBox.isWindowShown && (
        <div className="flex flex-col gap-3 star-container">
          <div
            onMouseEnter={() => setRating(0)}
            onMouseLeave={() => setRating(ratingRef.current)}
            className="flex mt-5 gap-2"
          >
            <AiFillStar
              onClick={() => updateRating(1)}
              className="text-3xl cursor-pointer star"
            />
            <AiFillStar
              onClick={() => updateRating(2)}
              className={`text-3xl cursor-pointer star ${
                rating && rating < 2 && "star-gray"
              }`}
            />
            <AiFillStar
              onClick={() => updateRating(3)}
              className={`text-3xl cursor-pointer star ${
                rating && rating < 3 && "star-gray"
              }`}
            />
            <AiFillStar
              onClick={() => updateRating(4)}
              className={`text-3xl cursor-pointer star ${
                rating && rating < 4 && "star-gray"
              }`}
            />
            <AiFillStar
              onClick={() => updateRating(5)}
              className={`text-3xl cursor-pointer star ${
                rating && rating < 5 && "star-gray"
              }`}
            />
          </div>
          <div className="flex gap-3">
            <MdCheckCircle
              onClick={() => handleAdd("rating")}
              className="text-3xl text-green-600 hover:text-green-700 cursor-pointer"
            />
            <MdCancel
              onClick={ratingBox.hideWindow}
              className="text-3xl text-red-600 hover:text-red-700 cursor-pointer"
            />
          </div>
        </div>
      )}
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
              onClick={() => handleAdd("review")}
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
