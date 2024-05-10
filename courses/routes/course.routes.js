const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} = require("../controllers/course.controller");

router.post("/", createCourse);
router.put("/:id", updateCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

module.exports = router;
