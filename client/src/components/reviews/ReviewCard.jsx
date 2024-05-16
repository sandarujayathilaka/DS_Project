import React, { useEffect, useState } from 'react';

const ReviewCard = ({ review }) => {
  const { userName, rating, comment, date } = review;

  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Calculate if there's a half star
  const hasHalfStar = rating % 1 !== 0;

  // Function to format the date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(date);

  return (
    <div className="bg-white max-w-xl rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500">
      <div className="flex mt-2">
        {/* Render stars */}
        {[...Array(5)].map((_, index) => {
          // Check if the current star should be full, half-full, or empty
          if (index < fullStars) {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 1l2.76 5.84 6.22.91-4.51 4.39 1.06 6.18L10 15.51V1z" />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 1l2.76 5.84 6.22.91-4.51 4.39 1.06 6.18L10 15.51V1z" />
              </svg>
            );
          }
        })}
        {/* Display rating value */}
        <span className="ml-2 text-gray-600">{rating}</span>
      </div>
      <p className="mt-4 text-md text-gray-600">{comment}</p>
      <div className="flex justify-between items-center">
        <div className="mt-4 flex items-center space-x-4 py-6">
          <div>
            <img
              className="w-10 h-10 mb-0 rounded-full"
              src={`https://ui-avatars.com/api/?name=${userName}`}
              alt={userName}
            />
          </div>
          <div className="text-sm font-semibold">{userName} • <span className="font-normal">{formattedDate}</span></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
