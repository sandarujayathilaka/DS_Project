import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, addToCart }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white">
      <div aria-label={course?.title}>
        <img
          alt={course?.title}
          className="object-cover w-full h-52 md:h-64 bg-gray-300 cursor-pointer"
          src={course?.image?.url}
          onClick={handleCourseClick}
        />
      </div>
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div className="text-lg font-bold tracking-wider text-main">
          ${course?.price}
        </div>
        <h3
          className="flex-1 py-2 text-lg font-semibold leading-snug cursor-pointer"
          onClick={handleCourseClick}
        >
          {course?.title}
        </h3>
        <div className="flex flex-wrap justify-between items-center pt-3 space-x-2 text-gray-600">
          <span>
            {new Date(course?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <button
            onClick={() =>
              addToCart(
                course?._id,
                course?.title,
                course?.price,
                course?.chapters,
                course?.image?.url
              )
            }
            className="px-4 py-2 rounded-full bg-main text-white hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
