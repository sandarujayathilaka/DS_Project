import React from 'react';

const CourseCard = ({ course }) => {
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
