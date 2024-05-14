const User = require("../models/profilemodel");
const { default: axios } = require("axios");
const bcrypt = require("bcryptjs");
const updateName = async (req, res) => {
  const { name, id } = req.body;

  try {
    if (!name) {
      throw new Error("Name is required");
    }

    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

  
    const userToUpdate = users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    
    if (userToUpdate.name === name) {
      throw new Error("No changes in name.");
    }

    
    const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



const updateEmail = async (req, res) => {
  const { email, id } = req.body;

  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

   
    const userToUpdate = users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    
    const existingEmail = await User.findOne({ email, _id: { $ne: id } });
    if (existingEmail) {
      throw new Error("Email is already in use");
    }

    
    if (userToUpdate.email === email) {
      throw new Error("No changes in email.");
    }

   
    const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true });

    if (!updatedUser) {
      throw new Error("Failed to update user");
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { confirmPwd, pwd, matchPwd, id } = req.body;

  try {
   
   
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

   
    const currentUser = await User.findById(id);
    if (!currentUser) {
      throw new Error("User not found");
    }
    const isMatch = await currentUser.matchPassword(confirmPwd);
   
   
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

   
    if (pwd !== matchPwd) {
      throw new Error("New password and re-entered password do not match");
    }

  
    if (confirmPwd === pwd) {
      throw new Error("New password cannot be the same as the current password");
    }

 
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pwd, salt);
   
     const updatedUser = await User.findByIdAndUpdate(id, { password }, { new: true });

 
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};


module.exports = { updateName,updateEmail,updatePassword };
