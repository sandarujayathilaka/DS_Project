const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LearnerSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    enrolledCourses: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Learner = mongoose.model("Learner", LearnerSchema);

module.exports = Learner;
