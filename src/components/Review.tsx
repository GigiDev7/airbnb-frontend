import React from "react";
import { BASE_URL } from "../config";
import { IReview } from "../interfaces";
import { formatDate } from "../utils/formatDate";

const Review: React.FC<{ review: IReview }> = ({ review }) => {
  const { year, month } = formatDate(new Date(review.createdAt));

  return (
    <div>
      <div className="flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-3xl"
          src={`${BASE_URL}/${review.user.image}`}
        />
        <div>
          <h2 className="font-medium">{review.user.firstname}</h2>
          <p className="text-gray-600">
            {month}, {year}
          </p>
        </div>
      </div>
      <p className="mt-4">{review.review}</p>
    </div>
  );
};

export default Review;
