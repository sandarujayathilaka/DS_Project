import React from 'react';
import { Link } from 'react-router-dom';

const TestCourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img className="h-48 w-full object-cover" src={course.image} alt={course.title} />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
        <p className="text-sm text-gray-500 mt-2">{course.description}</p>
        <Link to={`/reviews/${course.id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          See Reviews
        </Link>
      </div>
    </div>
  );
};

export default TestCourseCard;
