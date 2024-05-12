// CourseReviews.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../../components/reviews/ReviewCard';

const CourseReviews = () => {
  const { courseId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://udemy.dev/api/reviews/course/${courseId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Reviews for {courseId}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p>Loading...</p>
        ) : reviews && reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
