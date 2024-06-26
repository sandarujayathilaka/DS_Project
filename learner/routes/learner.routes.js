const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const {
  boughtCourse,
  enrollToCourse,
  unenrollFromCourse,
  getAllEnrolledCourses,
  getPendingEnrolledCourses,
  getAllUserCourse,
  calProgress,
  changeChapterStatus,
  updateNote,
  getNote,
  getAllEnrolledUsers,
} = require("../controllers/LearnerCtrl");

const learnerRoutes = express.Router();

learnerRoutes.post("/boughtcourse", boughtCourse);
learnerRoutes.post("/enroll", enrollToCourse);
learnerRoutes.post("/unenroll", unenrollFromCourse);
// learnerRoutes.post("/getenroll",getAllEnrolledCourses);
// learnerRoutes.get("/getpending", getPendingEnrolledCourses);
learnerRoutes.get("/getusercourses", getAllUserCourse);
learnerRoutes.post("/progress", calProgress);
learnerRoutes.put("/setstatus", changeChapterStatus);
learnerRoutes.put("/note", updateNote);
learnerRoutes.get("/note", getNote);
learnerRoutes.get("/student", getAllEnrolledUsers);

module.exports = learnerRoutes;
