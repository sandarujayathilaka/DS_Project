const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {},
    price: {
      type: Number,
    },
    chapters: [
      {
        title: String,
        description: String,
        access: {
          type: String,
          default: "paid",
          enum: ["free", "paid"],
        },
        status: {
          type: String,
          default: "draft",
          enum: ["draft", "ready"],
        },
        video: {},
      },
    ],
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: "draft",
    },
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

module.exports = mongoose.model("Course", courseSchema);
