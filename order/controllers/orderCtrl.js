const Stripe = require("stripe");
const dotenv = require("dotenv");
const Order = require("../models/Order");

dotenv.config();

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

const createOrder = async (req, res) => {
  // Get the order items, shipping address, total price
  const { courses} = req.body;

  // Check if order is not empty
  if (courses && courses.length <= 0) {
    throw new Error("Cart is Empty");
  }

  // Place order - save in DB
  const order = await Order.create({
    userId:"663dbf52047945ec5914b733",
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

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders fetched successfully",
    orders,
  });
};

const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.json({
      success: true,
      order,
    });
  } else {
    throw new Error("Order not found");
  }
};

const updateOrderStatus = async (req, res) => {
  const id = req.params.id;

  const updateOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    updateOrder,
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
};
