const Course = require("../models/Course");

const Instructor = require("../models/Instructor");


const createNewCourse = async (req, res) => {
  console.log("called",req.body)
  if (!req.body.c_name || !req.body.c_category || !req.body.c_description || !req.body.c_code) {
      return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
     

    const existingCourse = await Course.findOne({
      c_code: req.body.c_code
  });

  if (existingCourse) {
      return res.status(402).json({ message: "This course already exists" });
  }



      const result = await Course.create({
          c_name: req.body.c_name,
          c_category: req.body.c_category,
          c_description: req.body.c_description,
          c_code: req.body.c_code,
          instructor:req.body.instructor,
          videos: req.body.videos
      });


      res.status(201).json(result);
  } catch (err) {
     
      res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCourse = async (req, res) => {
  const course = await Course.find();
  if (course.length === 0) {
    return res.status(204).json({ 'message': 'No course found.' });
  }
  res.json(course);
}

const getCourse = async (req, res) => {
  
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Course ID required.' });

  const course = await Course.findOne({ _id: req.params.id });
 
  if (!course) {
      return res.status(204).json("No course matches ID");
  }
  res.json(course);
}

module.exports = {
    
    createNewCourse,
    getAllCourse,
    getCourse,
}