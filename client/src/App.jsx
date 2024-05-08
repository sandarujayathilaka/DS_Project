import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstructorLayout from "./layouts/InstructorLayout";
import AddCourse from "./pages/course/AddCourse";
import Course from "./pages/course/Course";
import Cart from "./components/ui/Cart";
import Student from "./components/ui/StudentPortal";


function App() {
  return (
    <BrowserRouter>
      <InstructorLayout>
        <Routes>
          <Route path="/" element={<AddCourse />} />
          <Route path="/course" element={<Course />} />
            <Route path="/cart" element={<Cart />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </InstructorLayout>
    </BrowserRouter>
  );

}

export default App;
