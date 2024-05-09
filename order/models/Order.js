const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    
    courses: [
      {
        type: Object,
        required: true,
      },
    ],

    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },

    // For stripe payment
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    // For admin
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compile to form model
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
