import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Student from "./components/StudentPortal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ReviewCard from "./components/reviews/ReviewCard";
import TestCourseCard from "./components/reviews/TestCourseCard";
import CourseReviews from "./pages/review/CourseReviews";
import Register from "./pages/Register";
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
      {/* <InstructorLayout> */}
        <Routes>
          <Route path="/" element={<AddCourse />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/regi" element={<Register/>} />
          <Route path="/reviewcard" element={<ReviewCard/>} />
          <Route path="/testCourseCard" element={<TestCourseCard/>} />
          <Route path="/reviewspage/:title" element={<CourseReviews />} />
          
        </Routes>
      {/* </InstructorLayout> */}
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Instructor routes */}
        <Route path="/instructor/dashboard" element={<Courses />} />
        <Route path="/instructor/courses" element={<Courses />} />
        <Route path="/instructor/courses/:id" element={<UpdateCourse />} />
        <Route
          path="/instructor/courses/:courseId/chapter/:chapterId"
          element={<UpdateChapter />}
        />
        <Route path="/instructor/insights" element={<Insights />} />

        <Route path="/videos/:courseId" element={<VideoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
