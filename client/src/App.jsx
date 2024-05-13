import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorLayout from "./layouts/InstructorLayout";
import AddCourse from "./pages/course/AddCourse";
import Course from "./pages/course/Course";
import Cart from "./components/Cart";
import Student from "./components/StudentPortal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReviewCard from "./components/reviews/ReviewCard";
import TestCourseCard from "./components/reviews/TestCourseCard";
import CourseReviews from "./pages/review/CourseReviews";
import Register from "./pages/Register";
import PostReview from "./pages/review/PostReview";
import Auth from "./pages/Auth";
import Courses from "./pages/course/Courses";
import UpdateCourse from "./pages/course/UpdateCourse";
import UpdateChapter from "./pages/course/UpdateChapter";
import { Toaster } from "react-hot-toast";
import Insights from "./pages/course/Insights";
import VideoDashboard from "./pages/course/VideoDashboard";

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
