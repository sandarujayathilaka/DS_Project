const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const { createOrder, updateOrderStatus } = require("../controllers/orderCtrl");



const orderRouter = express.Router();
orderRouter.post("/", createOrder);
// orderRouter.get("/", getAllOrders);
// orderRouter.get("/:id", getSingleOrder);
// orderRouter.put("/update/:id", updateOrderStatus);

module.exports = orderRouter;

