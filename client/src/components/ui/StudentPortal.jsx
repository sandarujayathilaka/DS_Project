import React, { useState, useEffect } from "react";

export default function Student(props) {
  const [selectedTab, setSelectedTab] = useState("ENROLLED");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend API
    // Example:
    // fetchCourses().then((data) => setCourses(data));
    // Replace fetchCourses() with your actual API call
    // Data should be an array of courses [{ name, description, ... }]
    const fakeData = [
      {
        name: "Course 1",
        description: "Description of course 1",
        status: "enrolled",
      },
      {
        name: "Course 2",
        description: "Description of course 2",
        status: "paid",
      },
      // Add more courses as needed
    ];
    setCourses(fakeData);
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const coursesToShow = courses.filter((course) => {
    return selectedTab === "ENROLLED"
      ? course.status === "enrolled"
      : course.status === "paid";
  });

  return (
    <section className="h-[950px] md:h-screen bg-slate-500 font-Barlow pb-2">
      <div className="container px-2 pt-5 text-center bg-black h-screen bg-opacity-30">
        <div className="flex items-center bg-lime-700 justify-between pt-6">
          <ul className="flex text-white pb-4">
            <li
              className={`cursor-pointer mr-8 ${
                selectedTab === "ENROLLED" ? "border-b-2" : ""
              }`}
              onClick={() => handleTabClick("ENROLLED")}
            >
              Enrolled
            </li>
            <li
              className={`cursor-pointer ${
                selectedTab === "PAID" ? "border-b-2" : ""
              }`}
              onClick={() => handleTabClick("PAID")}
            >
              Paid
            </li>
          </ul>
        </div>
        <div className="w-full">
          {coursesToShow.map((course, index) => (
            <div key={index} className="py-4">
              <h1 className="text-white text-2xl">{course.name}</h1>
              <p className="text-[#d2d8f9] font-thin text-md">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
