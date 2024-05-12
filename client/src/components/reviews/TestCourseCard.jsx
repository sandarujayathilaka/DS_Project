import React from 'react';
import { Link } from 'react-router-dom';

const TestCourseCard = ({ course }) => {
  // Dummy data for the course card
  const dummyCourse = {
    courseId: 'test1',
    title: 'Introduction to ML',
    description: 'This course provides an introduction to JavaScript programming language.',
    image: 'https://via.placeholder.com/300', // Placeholder image URL
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img className="h-48 w-full object-cover" src={dummyCourse.image} alt={dummyCourse.title} />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{dummyCourse.title}</h2>
        <p className="text-sm text-gray-500 mt-2">{dummyCourse.description}</p>
        <Link to={`/reviewspage/${dummyCourse.title}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          See Reviews
        </Link>
      </div>
    </div>
  );
};

export default TestCourseCard;
