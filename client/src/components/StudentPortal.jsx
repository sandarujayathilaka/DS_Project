import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Progress } from "@/components/ui/progress";
import PaymentHistory from "./PaymentHistory"; // Import the PaymentHistory component
import Note from "./Note";
import Footer from "./Footer";
import api from "@/api/build-client";
import useUserStore from "@/stores/auth";


const fetchCourses = async (setCourses,user) => {
  console.log(user.id)
  try {
    const response = await api.get("/learner/getusercourses");

     console.log(response.data);

    const coursesWithProgress = await Promise.all(
      response.data.map(async (course) => {
        const progressResponse = await api.post("/learner/progress", {
          courseId: course.courseId,
        });
        return { ...course, progress: progressResponse.data.progress };
      })
    );

    setCourses(coursesWithProgress);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

export default function Student(props) {
  const [selectedTab, setSelectedTab] = useState("Enrolled Courses");
  const [courses, setCourses] = useState([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    fetchCourses(setCourses,user);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

const handleEnrollClick = async (courseId) => {
  try {
    const response = await api.post("/learner/enroll", {
      courseId,
      userId: user.id,
    });
    console.log("Enrollment successful:", response.data);
    window.location.href = `/videos/${courseId}`;
  } catch (error) {
    console.error("Error enrolling in course:", error);
  }
};


  const handleUnenrollClick = async (courseId) => {
    try {
      const response = await api.post("/learner/unenroll", {
        courseId,
        userId: user.id,
      });
      console.log("Unenrollment successful:", response.data);
      fetchCourses(setCourses,user);
     
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  // Conditionally render courses or PaymentHistory based on selected tab
  const content =
    selectedTab === "Course Notes" ? (
      <Note />
    ) : selectedTab === "Payment History" ? (
      <PaymentHistory />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses
          .filter((course) =>
            selectedTab === "Enrolled Courses"
              ? course.enrollStatus === "enrolled"
              : course.enrollStatus === "pending"
          )
          .map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden shadow-lg"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover mb-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h2>    
                <Progress value={course.progress} />
                <p>{course.progress}% Completed</p>
                <br />
                <div className="flex justify-between">
                  {course.enrollStatus === "enrolled" && (
                    <button
                      className="text-sm text-white bg-red-500 px-3 py-1 rounded-full uppercase tracking-wide font-semibold focus:outline-none hover:bg-red-600 mr-2"
                      onClick={() => handleUnenrollClick(course.courseId)}
                    >
                      Unenroll
                    </button>
                  )}
                  <button
                    className="text-sm text-white bg-blue-500 px-3 py-1 rounded-full uppercase tracking-wide font-semibold focus:outline-none hover:bg-blue-600"
                    onClick={() => handleEnrollClick(course.courseId)}
                  >
                    {course.enrollStatus === "enrolled" ? "Resume" : "Enroll"}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{selectedTab}</h1>
            <div className="flex space-x-7">
              <button
                className={`text-lg font-medium ${
                  selectedTab === "Enrolled Courses"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Enrolled Courses")}
              >
                Enrolled
              </button>
              <button
                className={`text-lg font-medium ${
                  selectedTab === "Pending Enrollment"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Pending Enrollment")}
              >
                To Start
              </button>
              <button
                className={`text-lg font-medium ${
                  selectedTab === "Payment History"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Payment History")}
              >
                Payment History
              </button>
              <button
                className={`text-lg font-medium ${
                  selectedTab === "Course Notes"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick("Course Notes")}
              >
                Notes
              </button>
            </div>
          </div>
          {content}
        </div>
      </section>
      <Footer />
    </>
  );
}
