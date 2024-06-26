import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InstructorLayout from "./layouts/InstructorLayout";
import Cart from "./components/Cart";
import Student from "./components/StudentPortal";
import Home from "./pages/Home";
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
import Note from "./components/Note";

import AdminDashboard from "./component/AdminDashboard";
import Students from "./component/Student";
import Instructor from "./component/instructor/Instructor";
import Profile from "./component/Profile";

import ViewCourse from "./component/course/ViewCourse";

import InstructorProfile from "./pages/course/InstructorProfile";
import Course from "./pages/course/Course";
import CoursesCatalog from "./pages/course/CoursesCatalog";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/student" element={<Student />} />
        <Route path="/home" element={<Home />} />
        <Route path="/note" element={<Note />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/reviewcard" element={<ReviewCard />} />
        <Route path="/testCourseCard" element={<TestCourseCard />} />
        <Route path="/reviewspage/:title" element={<CourseReviews />} />
        <Route path="/addreview" element={<PostReview />} />




        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/instructors" element={<Instructor />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/:id" element={<ViewCourse />} />

        {/* Instructor routes */}
        <Route path="/instructor/dashboard" element={<Courses />} />
        <Route path="/instructor/courses" element={<Courses />} />
        <Route path="/instructor/courses/:id" element={<UpdateCourse />} />
        <Route
          path="/instructor/courses/:courseId/chapter/:chapterId"
          element={<UpdateChapter />}
        />
        <Route path="/instructor/insights" element={<Insights />} />
        <Route path="/instructor/profile" element={<InstructorProfile />} />

        <Route path="/videos/:courseId" element={<VideoDashboard />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/courses" element={<CoursesCatalog />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
