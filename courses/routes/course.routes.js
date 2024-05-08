const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const { createCourse } = require("../controllers/course.controller");

router.post("/", requireAuth(["student"]), createCourse);

module.exports = router;
