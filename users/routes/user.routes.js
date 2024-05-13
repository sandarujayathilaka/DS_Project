const express = require("express");
const router = express.Router();

const { signUp, signIn, signOut, getAllUsers } = require("../controllers/user.controller");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/", getAllUsers);
module.exports = router;
