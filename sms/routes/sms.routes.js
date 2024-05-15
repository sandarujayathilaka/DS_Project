const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middleware/require-auth");

const { sendSMS } = require("../controllers/smscontroller");


router.post("/",  sendSMS);

module.exports = router;
