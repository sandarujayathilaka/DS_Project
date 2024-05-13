const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  currentUserDetails,
  getAllUsers
} = require("../controllers/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/current-user", currentUserDetails);
router.get("/", getAllUsers);
module.exports = router;
