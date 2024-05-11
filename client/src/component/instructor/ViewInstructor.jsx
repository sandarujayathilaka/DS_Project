import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function ViewInstructor() {
   // const [instructorData, setInstructorData] = useState(null);
   // const { id } = useParams();

    // useEffect(() => {
    //     const getInstructor = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8080/in/instructor/${id}`);
    //             setInstructorData(response.data);
    //         } catch (error) {
    //             console.error('Error occurred while fetching course:', error);
    //         }
    //     };

    //     getInstructor();
    // }, [id]);

    const [instructorData, setInstructorData] = useState(null);
  const id = "m5gr84i9";

  // Sample data of instructors and courses
  const data = [
    {
      id: "m5gr84i9",
      name: "smith",
      email: "ken99@yahoo.com",
      courses: [
        {
          c_name: "Mathematics",
          c_category: "Science",
          c_description: "Advanced mathematics course",
          instructor: "smith",
          enrollStudents: [
            { _id: 1, name: "Alice" },
            { _id: 2, name: "Bob" }
          ]
        },
        {
          c_name: "Physics",
          c_category: "Science",
          c_description: "Introductory physics course",
          instructor: "smith",
          enrollStudents: [
            { _id: 3, name: "Charlie" },
            { _id: 4, name: "David" }
          ]
        }
      ]
    },
    // Add more instructor data...
  ];

  useEffect(() => {
    // Find the instructor data with matching ID
    const instructor = data.find((instructor) => instructor.id === id);
    if (instructor) {
      setInstructorData(instructor);
    }
  }, [id]);

  if (!instructorData) {
    return <div className="flex items-center justify-center min-h-screen bg-blue-200">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-96 mt-2 mb-2">
        <h1 className="text-center mb-4 text-xl font-bold">Instructor Details</h1>
        <p>Name: {instructorData.name}</p>
        <p>Email: {instructorData.email}</p>

        <h2 className="mt-4 mb-2 text-lg font-bold">Courses</h2>
        {instructorData.courses.length > 0 ? (
          <ul>
            {instructorData.courses.map((course, index) => (
              <li key={index}>
                <p>{index+1}</p>
                <p>Course Name: {course.c_name}</p>
                <p>Category: {course.c_category}</p>
                <p>Description: {course.c_description}</p>
                <p>Instructor: {course.instructor}</p>

              </li>
            ))}
          </ul>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};
