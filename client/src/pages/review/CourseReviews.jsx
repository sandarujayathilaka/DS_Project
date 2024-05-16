import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../../components/reviews/ReviewCard';
import Qutmark from '../../assets/q.png';
import api from '@/api/build-client';

const CourseReviews = () => {
  const { title } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0; 
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/reviews/course/${title}`);
        setReviews(response.data);
        setLoading(false);

        // Calculate average rating
        const avgRating = calculateAverageRating(response.data);
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [title]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0]; // Get only the date part
    return formattedDate;
  };

  return (
    <div>
      {/* Average Rating Display */}
      <div className="absolute font-semibold top-0 left-0 bg-teal-200 p-2 rounded-md">{`Average Rating  ${averageRating.toFixed(1)}`}</div>

      {/* Main Content */}
      <h2 className="text-2xl font-bold ml-5 mt-20 mb-4">Reviews for {title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-5 mr-5">
        {loading ? (
          <p>Loading...</p>
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={{ ...review, createdAt: formatDate(review.createdAt) }} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>

      {/* Footer Section */}
      <div className="container m-auto px-6 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between relative w-100 h-auto md:h-64 bg-100 shadow-2xl rounded-lg p-8">
          <div className="w-8/12 text-2xl font-semibold italic">
            <img alt="quote" className="float-left w-4 h-4 mr-1" src={Qutmark} />
            <span className="flex">We highly value your review as it helps us improve our services. Your reviews are crucial in shaping our future offerings and ensuring we meet your expectations.</span>
          </div>
          <Link to="/addreview" className="relative shadow-md font-medium my-5 py-2 px-4 text-white cursor-pointer bg-teal-600 hover:bg-cyan-500 rounded text-lg text-center w-48">
            <span className="absolute h-3 w-3 right-0 top-0 animate-ping inline-flex rounded-full bg-teal-700"></span>
            Add your review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseReviews;
