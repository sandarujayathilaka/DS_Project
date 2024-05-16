import React, { useEffect, useState } from 'react';
import CourseCard from '../components/coursecard/CourseCard';
import api from '@/api/build-client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseTab = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/');
        if (response.data && Array.isArray(response.data.courses)) {
          const coursesWithImageURL = response.data.courses.map(course => ({
            ...course,
            image: course.image && course.image.url,
          }));
          setCourses(coursesWithImageURL);

          await fetchAverageRatings(coursesWithImageURL);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      }
    };

    const fetchAverageRatings = async (courses) => {
      try {
        const updatedCourses = await Promise.all(courses.map(async (course) => {
          try {
            const reviewsResponse = await api.get(`/reviews/course/${course.title}`);
            const reviews = reviewsResponse.data;
            const averageRating = calculateAverageRating(reviews);
            return { ...course, averageRating };
          } catch (error) {
            console.error(`Error fetching reviews for course ${course.title}:`, error);
            return { ...course, averageRating: 0 }; 
          }
        }));
        setCourses(updatedCourses);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchCourses();
  }, []);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const filteredCourses = courses.filter(course => {
    return categoryFilter === '' || course.category === categoryFilter;
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <section className="pt-20 lg:pt-[40px] pb-10 lg:pb-20">
        <div className="container mx-auto">
          <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
            <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
              Our Recent Courses
            </h2>
            <p className="text-base text-body-color">
              Explore our latest offerings and find the perfect course for your needs.
            </p>
          </div>
          <div className="flex justify-start mb-6 px-4 items-center space-x-4">
            <label htmlFor="category" className="text-m font-medium text-gray-700">
              Search by Course Category
            </label>
            <select
              id="category"
              className="block w-100 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m rounded-md"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="artificial intelligence">Artificial Intelligence</option>
                <option value="game development">Game Development</option>
                <option value="data science<">Data Science</option>
                <option value="programming">Programming</option>
              </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseTab;
