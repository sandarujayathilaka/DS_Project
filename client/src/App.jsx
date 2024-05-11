import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import AdminDashboard from './component/AdminDashboard';
import Student from './component/Student';
import Instructor from './component/instructor/Instructor';
import Course from './component/course/Course';
import Profile from './component/Profile';
import AddCourse from './component/course/AddCourse';
import { Toaster } from "@/components/ui/toaster"
import ViewCourse from './component/course/ViewCourse';
import ViewInstructor from './component/instructor/ViewInstructor';
export default function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Header is common for all routes */}
        <Routes>
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/student' element={<Student />} />
          <Route path='/instructor' element={<Instructor />} />
          <Route path='/course' element={<Course />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addcourse' element={<AddCourse />} />
          <Route path='/view/:id' element={<ViewCourse />} />
          <Route path='/instructor/:id' element={<ViewInstructor />} />
       
         
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}
