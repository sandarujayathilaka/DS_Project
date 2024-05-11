import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstructorLayout from "./layouts/InstructorLayout";
import AddCourse from "./pages/course/AddCourse";
import Course from "./pages/course/Course";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      {/* <InstructorLayout> */}
        <Routes>
          <Route path="/" element={<AddCourse />} />
          <Route path="/course" element={<Course />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      {/* </InstructorLayout> */}
    </BrowserRouter>
  );
}

export default App;
