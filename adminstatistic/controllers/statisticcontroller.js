const User = require("../models/statisticmodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");

const getData = async (req, res) => {
  try {
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

    let instructorCount = 0;
    let studentCount = 0;
    users.forEach(user => {
      if (user.role === 'instructor') {
        instructorCount++;
      } else if (user.role === 'student') {
        studentCount++;
      }
    });

    const coursesResponse = await axios.get(`http://courses-srv:4000/api/courses`);
    const courses = coursesResponse.data.courses;


      const filteredCourses = courses
      .filter(course => course.status !== 'unpublished' && course.status !== 'draft') 
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
   

    const courseImages = filteredCourses.map(course => ({
      imageUrl: course.image && course.image.url ? course.image.url : undefined, 
      title: course.title,
      id: course.id,
    }));

    const responseData = {
      instructorCount,
      studentCount,
      courseCount: filteredCourses.length,
      courseImages,
    };

    res.status(200).json(responseData);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};





const getUsers = async (req, res) => {
  try {
  
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;
  
    const students = users.filter(user => user.role === 'student');
      const res2 = await axios.get('http://learner-srv:4000/api/learner/student');
     
       
   
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

    const filteredCourses = courses
    .filter(course => course.status !== 'unpublished' && course.status !== 'draft') 
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
 
    const instructorCoursesMap = {};

    filteredCourses.forEach(course => {
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
