const express = require("express");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../Controller/orderCtrl");

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
// orderRouter.get("/", getAllOrders);
// orderRouter.get("/:id", getSingleOrder);
orderRouter.put("/update/:id", updateOrderStatus);

module.exports = orderRouter;
