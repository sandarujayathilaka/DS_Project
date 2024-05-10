const express = require("express");
const router = express.Router();
const courseController = require("../../controller/courseController");

router.post(
  "/addCou",
  courseController.createNewCourse
);

router.get(
  "/course",
  courseController.getAllCourse
);

router.get(
  "/course/:id",
  courseController.getCourse
);

module.exports = router;
