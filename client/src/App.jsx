import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstructorLayout from "./layouts/InstructorLayout";
import AddCourse from "./pages/course/AddCourse";
import Course from "./pages/course/Course";

function App() {
  return (
    <BrowserRouter>
      <InstructorLayout>
        <Routes>
          <Route path="/" element={<AddCourse />} />
          <Route path="/course" element={<Course />} />
        </Routes>
      </InstructorLayout>
    </BrowserRouter>
  );
}

export default App;
