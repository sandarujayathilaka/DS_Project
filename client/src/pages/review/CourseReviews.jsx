// CourseReviews.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../../components/reviews/ReviewCard';

const CourseReviews = () => {
  const { title } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://udemy.dev/api/reviews/course/${title}`);
        setReviews(response.data); // Assuming the API returns an array of reviews directly
        setLoading(false);
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
      <h2 className="text-2xl font-bold mb-4">Reviews for {title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-5 mr-5">
        {loading ? (
          <p>Loading...</p>
        ) : reviews && reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.id} review={{ ...review, createdAt: formatDate(review.createdAt) }} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
