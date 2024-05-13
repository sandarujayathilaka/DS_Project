const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  currentUserDetails,
} = require("../controllers/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/current-user", currentUserDetails);

module.exports = router;
