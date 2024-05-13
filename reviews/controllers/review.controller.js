const Review = require("../models/review.model");
const asyncHandler = require("express-async-handler");


//post a review
const addReview = asyncHandler(async (req, res) => {
  const { courseId, userId } = req.body;

  // Check if a review already exists for the given user and course
  const existingReview = await Review.findOne({ courseId, userId });

  // If a review already exists, prevent the user from posting a new review
  if (existingReview) {
    return res.status(400).json({ message: "You have already submitted a review for this course" });
  }

  // If no existing review, create a new one
  const { title, userName, rating, comment, date } = req.body;
  const review = await Review.create({
    courseId,
    title,
    userId,
    userName,
    rating,
    comment,
    date
  });

  // Check if the review was successfully created and send the appropriate response
  review ? res.status(201).json(review) : res.status(400).json({ message: "Review not posted" });
});


//view all reviews of one course based on the course title
const viewReviews = asyncHandler(async (req, res) => {
  try {
    const { title } = req.params;
    console.log("Received title:", title);
    const reviews = await Review.find({ title: title });
    console.log("Found reviews:", reviews);
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for the specified title" });
    }
    res.json(reviews);
  } catch (error) {
    console.error("Error getting reviews by title:", error);
    res.status(500).json({ error: "Could not get reviews by title" });
  }
});






//get all
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  res.status(200).json({ reviews });
});

//get one review
const getOneReview = asyncHandler(async (req, res) => {
const { id } = req.params;

let review = null;

try {
  review = await Review.findOne({ _id: id });
} catch (err) {
  console.error(err);
  return res.status(500).json({
    error: "Internal server error",
  });
}

// check if review exists
if (!review) {
  return res.status(404).json({
    error: "Review not found",
  });
}
res.status(200).json({ review });
});



//remove the review
const removeReview = asyncHandler(async (req, res) => {
const id = req.params.id;
const review = await Review.findByIdAndDelete(id);

review
  ? res.status(200).json(review)
  : res.status(400).json({ message: "Review not removed" });
});




module.exports = {
addReview,
viewReviews,
getOneReview,
removeReview,
getAllReviews
};

