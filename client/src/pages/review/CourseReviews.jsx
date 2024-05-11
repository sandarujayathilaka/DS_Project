import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TestCourseCard from '../../components/reviews/TestCourseCard';
import axios from 'axios';

const CourseReviews = () => {
  const { courseId } = useParams(); // Get courseId from route parameters
  const [reviews, setReviews] = useState([]); // Initialize reviews state to an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/course/${courseId}`);
        console.log(response); // Log the reviews data
        setReviews(response.data.reviews); // Assuming the reviews are stored in response.data.reviews
        console.log(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
    console.log(reviews);
  }, [courseId]); // Add courseId to the dependency array

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        <p>Loading...</p>
      ) : reviews && reviews.length > 0 ? ( // Check if reviews is truthy and has length property
        reviews.map(review => (
          <TestCourseCard key={review._id} review={review} />
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default CourseReviews;
