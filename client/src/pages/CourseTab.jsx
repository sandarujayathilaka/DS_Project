import React, { useEffect, useState } from 'react';
import CourseCard from '../components/coursecard/CourseCard';
import api from '@/api/build-client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CourseTab = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/courses/')
      .then((response) => {
        console.log('API response:', response.data);
        if (response.data && Array.isArray(response.data.courses)) {
          // Map the courses to include the image URL directly
          const coursesWithImageURL = response.data.courses.map(course => ({
            ...course,
            image: course.image && course.image.url, 
          }));
          setCourses(coursesWithImageURL);
        } else {
          setError('Unexpected response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <Navbar/>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </section>
      <div>
        <Footer/>
      </div>
    </div>

  );
};

export default CourseTab;
