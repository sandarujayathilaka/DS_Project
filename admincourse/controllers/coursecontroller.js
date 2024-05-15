const Course = require("../models/coursemodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");

const updateStatus = async (req, res) => {
  const { feedback, status } = req.body;
  const courseId = req.params.id;

  try {
  
    const response = await axios.get(`http://courses-srv:4000/api/courses/${courseId}`);
    const course = response.data;
    
    if (!course) {
      throw new Error("Course not found.");
      
    }

   
    course.status = status === "approve" ? "approved" : "rejected";
    
   
    if (feedback && Array.isArray(feedback)) {
      for (const { chapterId, comment, isChecked } of feedback) {
        const chapterToUpdate = course.chapters.find(chapter => chapter._id === chapterId);

        if (chapterToUpdate) {
         
          if (chapterToUpdate.status === "approved" ) {
            continue;
          }

          
          chapterToUpdate.status = isChecked ? "approved" : "rejected";

          
          if (comment) {
            chapterToUpdate.comment = comment;
          }
        }
      }
    }

   
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

        const filteredCourses = courses
        .filter(course => course.status !== 'unpublished' && course.status !== 'draft') 
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
     

      
        const instructorResponse = await axios.get('http://adminstatistic-srv:4000/api/adminstatistic/instructors');
        const instructors = instructorResponse.data.formattedData;

    
        const coursesWithInstructors = filteredCourses.map((course) => {
          const matchingInstructor = instructors.find((instructor) => instructor.id === course.instructorId);
          return {
            ...course,
            instructor: matchingInstructor || { name: 'Unknown' } 
          };
        });
    res.status(200).send({coursesWithInstructors});
  } catch (error) {
    throw new Error("Error fetching data.");
    
  }
};



module.exports = { updateStatus,getAllUserCourse };
