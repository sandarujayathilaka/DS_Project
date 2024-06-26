const Course = require("../models/course.model");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");

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

const getAllCourses = async (req, res) => {
  const { page = 1, limit = 10, search = "", status = "" } = req.query;
  const skip = (page - 1) * limit;

  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }

  if (status) {
    query = { ...query, status };
  }

  const courses = await Course.find(query).skip(skip).limit(parseInt(limit));

  // Fetch instructor details for each course
  const coursesWithInstructors = await Promise.all(
    courses.map(async (course) => {
      // Assuming instructorId is the ID of the instructor
      const instructorId = course.instructorId;
      try {
        const instructorDetails = await axios.get(
          `http://users-srv:4000/api/users/user-details/${instructorId}`
        );
        // Assuming the instructor details are available in the response data
        const { name, email } = instructorDetails.data;
        // Adding instructor details to the course object
        return {
          ...course._doc,
          instructor: {
            name,
            email,
          },
        };
      } catch (error) {
        console.error(
          `Error fetching instructor details for course ${course._id}:`,
          error
        );
        // If there's an error fetching instructor details, return the course without instructor details
        return course;
      }
    })
  );

  const totalCount = await Course.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalCount,
    totalPages,
    currentPage: page,
    pageSize: limit,
  };

  res.send({ courses: coursesWithInstructors, pagination });
};

const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.send(course);
};

const getCurrentUserCourses = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const skip = (page - 1) * limit;

  let query = {
    instructorId: req.currentUser.id, // Filter courses by instructorId
  };
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }

  const courses = await Course.find(query).skip(skip).limit(parseInt(limit));

  const totalCount = await Course.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  const pagination = {
    totalCount,
    totalPages,
    currentPage: page,
    pageSize: limit,
  };

  res.send({ courses, pagination });
};

const updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (course.instructorId.toString() !== req.currentUser.id) {
    return res.status(401).send("You are not authorized to update this course");
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

  if (course.instructorId.toString() !== req.currentUser.id) {
    return res.status(401).send("You are not authorized to delete this course");
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(204).send(course);
};

const createChapter = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (course.instructorId.toString() !== req.currentUser.id) {
    return res.status(401).send("You are not authorized to update this course");
  }

  course.chapters.push(req.body);

  await course.save();

  res.status(201).send(course);
};

const getChapterById = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  const chapter = course.chapters.id(req.params.chapterId);

  if (!chapter) {
    return res.status(404).send("Chapter not found");
  }

  res.send(chapter);
};

const updateChapter = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (course.instructorId.toString() !== req.currentUser.id) {
    return res.status(401).send("You are not authorized to update this course");
  }

  const chapter = course.chapters.id(req.params.chapterId);

  if (!chapter) {
    return res.status(404).send("Chapter not found");
  }

  chapter.set(req.body);

  await course.save();

  res.send(course);
};

const deleteChapter = async (req, res) => {
  const { id, chapterId } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (course.instructorId.toString() !== req.currentUser.id) {
    return res.status(401).send("You are not authorized to update this course");
  }

  const chapter = course.chapters.id(chapterId);

  if (!chapter) {
    return res.status(404).send("Chapter not found");
  }

  course.chapters = course.chapters.filter(
    (chapter) => chapter._id.toString() !== chapterId
  );

  await course.save();

  res.status(204).send(course);
};

const deleteAsset = async (req, res) => {
  const { public_id } = req.body;

  await cloudinary.uploader.destroy(public_id);

  res.send("Asset deleted");
};

module.exports = {
  createCourse,
  getAllCourses,
  getCurrentUserCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  createChapter,
  getChapterById,
  updateChapter,
  deleteChapter,
  deleteAsset,
};
