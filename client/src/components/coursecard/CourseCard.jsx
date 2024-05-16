import React from 'react';

const CourseCard = ({ course }) => {
  const averageRating = course.averageRating !== undefined ? course.averageRating : 0;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  return (
    <div className="max-w-sm py-8 px-4">
      <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
        <div className="rounded-t-lg overflow-hidden h-60">
          <img
            className="w-full h-full object-cover"
            src={course.image}
            alt={course.title}
          />
        </div>
        <div className="py-6 px-8 rounded-lg bg-white">
          <div className="h-30">
            <h2 className="text-gray-700 font-bold text-lg mb-3 hover:text-gray-900 hover:cursor-pointer">
              {course.title}
            </h2>
            {/* Display average rating */}
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => {
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
              <span className="ml-2 text-gray-600">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-gray-600 font-semibold italic  mt-2">{course.category}</p>
          </div>

          <button className="mt-6 py-2 px-4 bg-green-300 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">
            Add to Cart
          </button>
        </div>
        <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg">
          <span className="text-md">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
