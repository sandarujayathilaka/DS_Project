import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Student from "./components/StudentPortal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Courses from "./pages/course/Courses";
import UpdateCourse from "./pages/course/UpdateCourse";
import UpdateChapter from "./pages/course/UpdateChapter";
import { Toaster } from "react-hot-toast";
import Insights from "./pages/course/Insights";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/student" element={<Student />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Courses />} />

        {/* Instructor routes */}
        <Route path="/instructor/courses" element={<Courses />} />
        <Route path="/instructor/courses/:id" element={<UpdateCourse />} />
        <Route
          path="/instructor/courses/:courseId/chapter/:chapterId"
          element={<UpdateChapter />}
        />
        <Route path="/instructor/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
