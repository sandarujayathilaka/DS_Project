const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const { sendNotificationSpecificUsers } = require("../controllers/EmailCtrl");


const emailRoute = express.Router();

emailRoute.post("/sentone", sendNotificationSpecificUsers);



module.exports = emailRoute;

