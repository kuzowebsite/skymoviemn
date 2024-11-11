import React from "react";

const StarRating = ({ rating }) => {
  const normalizedRating = Math.round(rating / 2);
  const stars = Array.from({ length: 5 }, (_, index) => index < normalizedRating);

  return (
    <div className="mt-3 flex space-x-1">
      {stars.map((filled, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3 w-3 ${filled ? 'text-yellow-400' : 'text-gray-400'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;