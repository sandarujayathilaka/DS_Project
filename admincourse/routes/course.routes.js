const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/require-auth");

const { updateStatus, getAllUserCourse } = require("../controllers/coursecontroller");

router.put("/:id",  updateStatus);
router.get("/",  getAllUserCourse);

module.exports = router;
