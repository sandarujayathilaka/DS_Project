const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const { createOrder, updateOrderStatus, getSpecificUserAllOrders } = require("../controllers/orderCtrl");



const orderRouter = express.Router();
orderRouter.post("/", createOrder);
orderRouter.get("/userorders",getSpecificUserAllOrders);


module.exports = orderRouter;

