const Course = require("../models/coursemodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");

const updateStatus = async (req, res) => {
  const { feedback, status } = req.body;
  const courseId = req.params.id;

  try {
    // Fetch course data from the outer service
    const response = await axios.get(`http://courses-srv:4000/api/courses/${courseId}`);
    const course = response.data;

    if (!course) {
      throw new Error("Course not found.");
      
    }

    // Update the course status based on the request
    course.status = status === "approve" ? "approved" : "rejected";

    // Update chapter statuses and comments based on feedback
    if (feedback && Array.isArray(feedback)) {
      for (const { chapterId, comment, isChecked } of feedback) {
        const chapterToUpdate = course.chapters.find(chapter => chapter._id === chapterId);

        if (chapterToUpdate) {
          // Skip updating if chapter status is already approved or published
          if (chapterToUpdate.status === "approved" || chapterToUpdate.status === "published") {
            continue; // Skip this chapter
          }

          // Update chapter status
          chapterToUpdate.status = isChecked ? "approved" : "rejected";

          // Update chapter comment if provided
          if (comment) {
            chapterToUpdate.comment = comment;
          }
        }
      }
    }

    // Save the updated course
    const updatedCourse = await Course.findByIdAndUpdate(courseId, course, { new: true });

    res.status(200).send(updatedCourse);
  } catch (error) {
    throw new Error("Internal Server Error.");
   
  }
};


const getAllUserCourse = async (req, res) => {
  try {
  
    const courseResponse = await axios.get('http://courses-srv:4000/api/courses');
        const courses = courseResponse.data.courses;

        // Fetch all instructors
        const instructorResponse = await axios.get('http://adminstatistic-srv:4000/api/adminstatistic/instructors');
        const instructors = instructorResponse.data.formattedData;

        // Map through courses to add instructor details
        const coursesWithInstructors = courses.map((course) => {
          const matchingInstructor = instructors.find((instructor) => instructor.id === course.instructorId);
          return {
            ...course,
            instructor: matchingInstructor || { name: 'Unknown' } // Set a default if no matching instructor found
          };
        });
    res.status(200).send({coursesWithInstructors});
  } catch (error) {
    throw new Error("Error fetching data.");
    
  }
};



module.exports = { updateStatus,getAllUserCourse };
