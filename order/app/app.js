const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const Stripe = require("stripe");
const dbConnect = require("../config/doConnect.js");
const orderRouter = require("../routes/ordersRoute.js");
const Order = require("../model/Order.js");
const { default: axios } = require("axios");

dbConnect();
const app = express();
app.use(cors());

// Stripe webhook

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_e0c2f89479f5cde8060565d3618f985f8a4c8dabf2b2307b61ee52ee7c0c8448";

app.post(
  "/order/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      // Update order details after payment
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
      // Find the order
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentMethod,
          paymentStatus,
        },
        { new: true }
      );

      await axios.post("http://learner-srv:4000/api/v1/learner/boughtCourse", {
        userId: order.userId,
        courses: order.courses,
      });
   
    } else {
      return;
    }
    response.send();
  }
);

// Pass incoming data to json
app.use(express.json());

// Routes
app.use("/order", orderRouter);

module.exports = app;
