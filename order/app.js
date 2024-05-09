const express = require("express");
require("dotenv").config();
require("colors");
require("express-async-errors");
const cookieSession = require("cookie-session");
const { errorHandler } = require("./middleware/error-handler");
const { currentUser } = require("./middleware/current-user");

const Order = require("./models/Order.js")
const { default: axios } = require("axios");

const Stripe = require("stripe");
const orderRouter = require("./routes/order.routes.js");



const app = express();

// make sure express is aware that it is behind a proxy of ingress-nginix and it should still trust traffic as being secure even though it is coming from that proxy
app.set("trust proxy", true);


// Stripe instance
const stripe = new Stripe(
 process.env.STRIPE_KEY
);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_e0c2f89479f5cde8060565d3618f985f8a4c8dabf2b2307b61ee52ee7c0c8448";

app.post(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    console.log("Endpoint called")
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      console.log("Endpoint called under 1 st try");
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
          console.log("Endpoint called under 2 nd try");
     
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      console.log(err.message)
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

      await axios.post("http://learner-srv:4000/api/learner/boughtCourse", {
        userId: order.userId,
        courses: order.courses,
      });
   
    } else {
      return;
    }
    response.send();
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);


app.get("/api/order", (req, res) => {
  res.send("Hello World");
});


app.use("/api/order", orderRouter);
app.use(errorHandler);

module.exports = { app };
