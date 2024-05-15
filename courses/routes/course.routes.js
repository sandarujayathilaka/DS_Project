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
  getCurrentUserCourses,
} = require("../controllers/course.controller");

// asset
router.delete("/asset", deleteAsset);

// course
router.post("/", requireAuth(["instructor"]), createCourse);
router.get("/my-courses", requireAuth(["instructor"]), getCurrentUserCourses);
router.patch("/:id", requireAuth(["instructor"]), updateCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.delete("/:id", requireAuth(["instructor"]), deleteCourse);

// chapter
router.post("/:id/chapters", requireAuth(["instructor"]), createChapter);
router.get("/:id/chapters/:chapterId", getChapterById);
router.patch(
  "/:id/chapters/:chapterId",
  requireAuth(["instructor"]),
  updateChapter
);
router.delete(
  "/:id/chapters/:chapterId",
  requireAuth(["instructor"]),
  deleteChapter
);

module.exports = router;
