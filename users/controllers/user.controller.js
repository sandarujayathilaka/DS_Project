const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  // Check if email exists
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("Email in use");
  }

  const user = new User({ name, email, password, role });

  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY
  );

  res.status(201).send({ user, token: userJwt });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordsMatch = await user.matchPassword(password);

  if (!passwordsMatch) {
    throw new Error("Invalid credentials");
  }

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY
  );

  res.status(200).send({ user, token: userJwt });
};

const currentUserDetails = async (req, res) => {
  const userDetails = await User.findOne({ _id: req.currentUser?.id });

  if (!userDetails) {
    throw new Error("User not found");
  }

  res.status(200).send(userDetails);
};

module.exports = { signUp, signIn, currentUserDetails };
