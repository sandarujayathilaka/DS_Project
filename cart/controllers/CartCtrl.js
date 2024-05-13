const Cart = require("../models/Cart");


const addCartItems = async (req, res) => {
  const { course} = req.body;
  const userId = req.currentUser.id;
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If the cart exists, push all courses to the existing cart
      cart.course.push(...course);
    } else {
      // If the cart doesn't exist, create a new cart with all courses
      cart = new Cart({ userId, course });
    }

    await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getCartItems = async (req, res) => {
    const userId = "663dbf52047945ec5914b733"; // Assuming userId is passed as a parameter in the URL
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteAllCartItems = async (req, res) => {
  const { userId } = req.body; // Assuming userId is passed as a parameter in the URL
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Set the course array to an empty array to delete all cart items
    cart.course = [];
    await cart.save();

    return res
      .status(200)
      .json({ message: "All cart items deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCartItemOneByOne = async (req, res) => {
  const { courseId } = req.params // Assuming userId and courseId are passed as parameters in the URL
  const userId = "663dbf52047945ec5914b733";
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Filter out the course to delete
    cart.course = cart.course.filter(
      (course) => course.courseId !== courseId
    );
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
  addCartItems,
  getCartItems,
  deleteAllCartItems,
  deleteCartItemOneByOne,
};