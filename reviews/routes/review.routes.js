const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/require-auth");

const {
    viewReviews,
    addReview,
    getOneReview,
    removeReview,
    getAllReviews
  } = require("../controllers/review.controller.js");
// router.post("/", requireAuth(["student"]), createCourse);
router.post("/add" , addReview);
router.get("/:id", getOneReview);
router.get("/course/:title", viewReviews);
router.delete("/:id", removeReview);
router.get("/", getAllReviews);

module.exports = router;







