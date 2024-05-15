const Cart = require("../models/Cart");


const addCartItems = async (req, res) => {
  const { course } = req.body; // Extract the course object from the request body
  console.log(course);
  const userId = req.currentUser.id;
  const courseId = course.courseId;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const courseExists = cart.course.some((c) => c.courseId === courseId);
      console.log(courseExists);
      if (courseExists) {
        return res.status(400).json({ message: "Course already in the cart" });
      }
      cart.course.push(course);
    } else {
      cart = new Cart({ userId, course: [course] });
    }

    await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const getCartItems = async (req, res) => {
    const userId = req.currentUser.id; 
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
  const { userId } = req.params; 
  console.log("Deleted all carts")
  console.log("Deleted Id :",userId)
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
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
  const { courseId } = req.params 
  const userId = req.currentUser.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

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