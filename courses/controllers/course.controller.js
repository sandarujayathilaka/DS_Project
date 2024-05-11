const Course = require("../models/course.model");

const createCourse = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new Error("Title is required");
  }

  const course = new Course({
    title,
    // instructorId: req.currentUser.id,
    instructorId: req.currentUser.id,
  });

  await course.save();

  res.status(201).send(course);
};

const getAllCourses = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }

  const courses = await Course.find(query).skip(skip).limit(parseInt(limit));

  res.send(courses);
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.send(course);
};

const updateCourse = async (req, res) => {
  const existingCourse = await Course.findById(req.params.id);

  if (!existingCourse) {
    return res.status(404).send("Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send(updatedCourse);
};

const deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(204).send(course);
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
