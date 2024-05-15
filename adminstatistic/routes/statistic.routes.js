const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const { getData, getUsers, getInstructors } = require("../controllers/statisticcontroller");

router.get("/",  getData);
router.get("/users",  getUsers);
router.get("/instructors",   getInstructors);
module.exports = router;
