const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const { updateName, updateEmail, updatePassword } = require("../controllers/profilecontroller");

router.put("/name", updateName);
router.put("/email",  updateEmail);
router.put("/pass", updatePassword);

module.exports = router;
