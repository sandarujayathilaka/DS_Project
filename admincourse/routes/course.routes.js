const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const { updateName } = require("../controllers/coursecontroller");

router.get("/",  updateName);

module.exports = router;
