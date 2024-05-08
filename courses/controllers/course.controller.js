const Course = require("../models/course.model");

const createCourse = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new Error("Title is required");
  }

  const course = new Course({
    title,
    instructorId: req.currentUser.id,
  });

  await course.save();

  res.status(201).send(course);
};

module.exports = { createCourse };
