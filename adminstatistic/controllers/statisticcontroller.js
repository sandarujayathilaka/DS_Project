const User = require("../models/statisticmodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");

const getData = async (req, res) => {
  try {
   
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;
console.log(users)
   
    let instructorCount = 0;
    let studentCount = 0;

    
    users.forEach(user => {
      if (user.role === 'publisher') {
        instructorCount++;
      } else if (user.role === 'student') {
        studentCount++;
      }
    });

    
    const coursesResponse = await axios.get(`http://courses-srv:4000/api/courses`);
    const courses = coursesResponse.data.courses;

    
    courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

   
    const courseImages = courses.map(course => {
      return {
        imageUrl: course.image.url, 
        title: course.title,
        id:course.id,

      };
    });

    
    const responseData = {
      instructorCount,
      studentCount,
      courseCount: courses.length,
      courseImages,
      
    };

   
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

  
    res.status(200).send({students});
  } catch (error) {

    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

const getInstructors = async (req, res) => {
  try {
  
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

  
    const instructors = users.filter(user => user.role === 'publisher');

  
    res.status(200).send({instructors});
  } catch (error) {

    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = { getData,getUsers,getInstructors };
