import { BrowserRouter, Route, Routes } from "react-router-dom";
import InstructorLayout from "./layouts/InstructorLayout";
import Courses from "./pages/course/Courses";
import UpdateCourse from "./pages/course/UpdateCourse";
import UpdateChapter from "./pages/course/UpdateChapter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <InstructorLayout>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/instructor/courses" element={<Courses />} />
          <Route path="/instructor/course/:id" element={<UpdateCourse />} />
          <Route
            path="/instructor/course/:courseId/chapter/:chapterId"
            element={<UpdateChapter />}
          />
        </Routes>
      </InstructorLayout>
    </BrowserRouter>
  );
}

export default App;
