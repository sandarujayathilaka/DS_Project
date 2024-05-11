const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    courseId: { 
        type: String,
        required: true
    },

    courseTitle: {
        type: String,
        required: true
    },

    userId: { 
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    date:{
        type: Date,
        default: Date.now
    }


  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Review", reviewSchema);