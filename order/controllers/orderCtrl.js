const Stripe = require("stripe");
const dotenv = require("dotenv");
const Order = require("../models/Order");

dotenv.config();

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

const createOrder = async (req, res) => {

  const { courses} = req.body;


  if (courses && courses.length <= 0) {
    throw new Error("Cart is Empty");
  }

  const order = await Order.create({
    userId:req.currentUser.id,
    courses,
    totalPrice:"0",
  });


  // Make payment with Stripe
  const convertedOrders = courses.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item ? item.title : "",
          description: item ? item.description : "",
        },
        unit_amount: item ? item.price * 100 : 0,
      },
      quantity: item ? item.qty : 0,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order._id),
    },
    mode: "payment",
    success_url: "http://localhost:5173/student",
    cancel_url: "http://localhost:5173/cart",
  });

  res.send({ url: session.url });
};


// Get all orders of a specific user
const getSpecificUserAllOrders = async (req, res) => {
  const userId = req.currentUser.id;

  try {
    const orders = await Order.find({
      userId,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createOrder,
  getSpecificUserAllOrders,
};
