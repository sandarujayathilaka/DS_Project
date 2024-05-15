import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Student from "./components/StudentPortal";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Courses from "./pages/course/Courses";
import UpdateCourse from "./pages/course/UpdateCourse";
import UpdateChapter from "./pages/course/UpdateChapter";
import { Toaster } from "react-hot-toast";
import Insights from "./pages/course/Insights";
import VideoDashboard from "./pages/course/VideoDashboard";
import Note from "./components/Note";

import Header from './component/Header';
import AdminDashboard from './component/AdminDashboard';
import Students from './component/Student';
import Instructor from './component/instructor/Instructor';
import Course from './component/course/Course';
import Profile from './component/Profile';

import ViewCourse from './component/course/ViewCourse';

import InstructorProfile from "./pages/course/InstructorProfile";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/student" element={<Student />} />
        <Route path="/home" element={<Home />} />
        <Route path="/note" element={<Note />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />


       
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/instructors" element={<Instructor />} />
          <Route path="/admin/courses" element={<Course />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/view/:id" element={<ViewCourse />} />
         


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
     
      
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
