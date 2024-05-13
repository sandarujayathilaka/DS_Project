import Navbar from "@/components/dashboard/course/Navbar";
import Sidebar from "@/components/dashboard/course/Sidebar";
import React from "react";

const CourseLayout = ({
  course,
  selectedChapter,
  setSelectedChapter,
  children,
}) => {
  return (
    <div>
      <Navbar title={course?.title} />
      <div className="flex w-full">
        <Sidebar
          chapters={course?.chapters}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default CourseLayout;
