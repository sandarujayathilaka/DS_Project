import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorLayout from "./layouts/InstructorLayout";
import AddCourse from "./pages/course/AddCourse";
import Course from "./pages/course/Course";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReviewCard from "./components/reviews/ReviewCard";
import TestCourseCard from "./components/reviews/TestCourseCard";
import CourseReviews from "./pages/review/CourseReviews";
import Register from "./pages/Register";
import PostReview from "./pages/review/PostReview";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<AddCourse />} />
        <Route path="/course" element={<Course />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regi" element={<Register />} />
        <Route path="/reviewcard" element={<ReviewCard />} />
        <Route path="/testCourseCard" element={<TestCourseCard />} />
        <Route path="/reviewspage/:title" element={<CourseReviews />} />
        <Route path="/addreview" element={<PostReview />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
