const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const {
  boughtCourse,
  enrollToCourse,
  unenrollFromCourse,
  getAllEnrolledCourses,
  getPendingEnrolledCourses,
  getAllUserCourse,
} = require("../controllers/LearnerCtrl");


const learnerRoutes = express.Router();

learnerRoutes.post("/boughtcourse", boughtCourse);
learnerRoutes.post("/enroll", enrollToCourse);
learnerRoutes.post("/unenroll", unenrollFromCourse);
learnerRoutes.post("/getenroll",getAllEnrolledCourses);
learnerRoutes.post("/getpending", getPendingEnrolledCourses);
learnerRoutes.post("/getusercourses", getAllUserCourse);


module.exports = learnerRoutes;

