const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  createChapter,
  getChapterById,
  updateChapter,
  deleteChapter,
  deleteAsset,
} = require("../controllers/course.controller");

// asset
router.delete("/asset", deleteAsset);

// course
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", deleteCourse);

// chapter
router.post("/:id/chapters", createChapter);
router.get("/:id/chapters/:chapterId", getChapterById);
router.patch("/:id/chapters/:chapterId", updateChapter);
router.delete("/:id/chapters/:chapterId", deleteChapter);

module.exports = router;
