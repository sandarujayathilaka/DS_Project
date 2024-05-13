const User = require("../models/statisticmodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");

const getData = async (req, res) => {
  try {
    // Fetch users data
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

    // Count instructors and students
    let instructorCount = 0;
    let studentCount = 0;
    users.forEach(user => {
      if (user.role === 'instructor') {
        instructorCount++;
      } else if (user.role === 'student') {
        studentCount++;
      }
    });

    // Fetch courses data
    const coursesResponse = await axios.get(`http://courses-srv:4000/api/courses`);
    const courses = coursesResponse.data.courses;

    // Filter courses by status and sort by createdAt
    const filteredCourses = courses
      .filter(course => course.status !== 'unpublished') // Filter out courses with status "unpublished"
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort courses by createdAt descending

    // Prepare course images data
    const courseImages = filteredCourses.map(course => ({
      imageUrl: course.image.url,
      title: course.title,
      id: course.id,
    }));

    // Construct response data
    const responseData = {
      instructorCount,
      studentCount,
      courseCount: filteredCourses.length, // Use filtered courses count
      courseImages,
    };

    // Send the response with filtered and processed data
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};




const getUsers = async (req, res) => {
  try {
  
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;
  
    const students = users.filter(user => user.role === 'student');
      const res2 = await axios.get('http://learner-srv:4000/api/learner/student');
     
        console.log("res2",res2.data)
   
      const userIdToCoursesMap = {};
      res2.data.forEach(user => {
        userIdToCoursesMap[user.userId] = user.enrolledCourses;
      });

     
      const formattedData = students.map(student => {
        const originalDate = new Date(student.createdAt);
        const formattedDate = originalDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });

        const userId = student.id;
        const enrolledCourses = userIdToCoursesMap[userId] || [];

        return {
          ...student,
          createdAt: formattedDate,
          enrolledCourses: enrolledCourses
        };
      });

  
    res.status(200).send({formattedData});
  } catch (error) {

    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

const getInstructors = async (req, res) => {
  try {
  
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

  
    const instructors = users.filter(user => user.role === 'instructor');

 
    const coursesResponse = await axios.get(
      "http://courses-srv:4000/api/courses"
    );
    const courses = coursesResponse.data.courses;

    
    const instructorCoursesMap = {};

    courses.forEach(course => {
      if (!instructorCoursesMap[course.instructorId]) {
        instructorCoursesMap[course.instructorId] = [];
      }
      instructorCoursesMap[course.instructorId].push(course);
    });

    
    const formattedData = instructors.map(instructor => {
      const originalDate = new Date(instructor.createdAt);
      const formattedDate = originalDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });

      const instructorId = instructor.id;
      const addedCourses = instructorCoursesMap[instructorId] || [];

      return {
        ...instructor,
        createdAt: formattedDate,
        addedCourses: addedCourses
      };
    });
    res.status(200).send({formattedData});
  } catch (error) {

    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = { getData,getUsers,getInstructors };
