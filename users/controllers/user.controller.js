const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  // Check if email exists
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("Email in use");
  }

  const user = new User({ name, email, password });

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

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(user);
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

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(user);
};

const signOut = (req, res) => {
  req.session = null;

  res.send({});
};


const getAllUsers = async (req, res) => {

  const users = await User.find();
  res.send(users);
};
module.exports = { signUp, signIn, signOut,getAllUsers };
