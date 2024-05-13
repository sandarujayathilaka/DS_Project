const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  currentUserDetails,
  getUserDetails,
} = require("../controllers/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/current-user", currentUserDetails);
router.get("/user-details/:id", getUserDetails);

module.exports = router;
