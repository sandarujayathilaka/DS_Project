import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Progress } from "@/components/ui/progress";
import PaymentHistory from "./PaymentHistory"; // Import the PaymentHistory component
import api from "@/api/build-client";

const fetchCourses = async (setCourses) => {
  try {
    const response = await api.post("/learner/getusercourses", {
      userId: "663dbf52047945ec5914b733",
    });

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
  const [selectedTab, setSelectedTab] = useState("ENROLLED");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses(setCourses);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleEnrollClick = async (courseId) => {
    try {
      const response = await api.post("/learner/enroll", {
        courseId,
        userId: "663dbf52047945ec5914b733",
      });
      console.log("Enrollment successful:", response.data);
      fetchCourses(setCourses);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenrollClick = async (courseId) => {
    try {
      const response = await api.post("/learner/unenroll", {
        courseId,
        userId: "663dbf52047945ec5914b733",
      });
      console.log("Unenrollment successful:", response.data);
      fetchCourses(setCourses);
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };

  // Conditionally render courses or PaymentHistory based on selected tab
  const content =
    selectedTab === "HISTORY" ? (
      <PaymentHistory />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses
          .filter((course) =>
            selectedTab === "ENROLLED"
              ? course.enrollStatus === "enrolled"
              : course.enrollStatus === "pending"
          )
          .map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden shadow-lg"
            >
              <img
                src={
                  "https://img.freepik.com/free-psd/e-learning-template-design_23-2151081798.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1714953600&semt=ais"
                }
                alt={course.title}
                className="w-full h-40 object-cover mb-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-700 mb-1">
                  Author: {course.author}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Price: ${course.price}
                </p>{" "}
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
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex space-x-4">
              <button
                className={`text-sm font-medium ${
                  selectedTab === "ENROLLED" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleTabClick("ENROLLED")}
              >
                Enrolled
              </button>
              <button
                className={`text-sm font-medium ${
                  selectedTab === "PAID" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleTabClick("PAID")}
              >
                To Start
              </button>
              <button
                className={`text-sm font-medium ${
                  selectedTab === "HISTORY" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleTabClick("HISTORY")}
              >
                Payment History
              </button>
            </div>
          </div>
          {content}
        </div>
      </section>
    </>
  );
}
