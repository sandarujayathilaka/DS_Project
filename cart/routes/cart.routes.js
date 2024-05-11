const express = require("express");
const { requireAuth } = require("../middleware/require-auth");
const { addCartItems, deleteCartItemOneByOne, getCartItems, deleteAllCartItems } = require("../controllers/CartCtrl");



const cartRoutes = express.Router();

cartRoutes.post("/addcart", addCartItems);
cartRoutes.delete("/deletecart", deleteAllCartItems);
cartRoutes.delete("/deleteitem/:courseId", deleteCartItemOneByOne);
cartRoutes.get("/getcartitem",getCartItems);



module.exports = cartRoutes;

