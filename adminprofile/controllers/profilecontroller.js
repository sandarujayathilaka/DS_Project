const User = require("../models/profilemodel");
const { default: axios } = require("axios");

const updateName = async (req, res) => {
  const { name, id } = req.body;
console.log(name, id);
  try {
    if (!name) {
      throw new Error("Name is required");
    }

    // Fetch all users from the users-srv service
    const usersResponse = await axios.get(`http://users-srv:4000/api/users`);
    const users = usersResponse.data;

    // Find the user with the specified id
    const userToUpdate = users.find((user) => user._id === id);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    // Check if the name is already the same
    if (userToUpdate.name === name) {
      throw new Error("No changes in name.");
    }

    // Update the user's name
    userToUpdate.name = name;

    // Save the updated user
    await User.findByIdAndUpdate(id, { name });

    res.status(201).send(userToUpdate);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { updateName };


const updateEmail = async (req, res) => {
  //const { email } = req.body;
  const { email,id } = req.body;
  try {
   
    // const user = await User.findOne({ _id: req.currentUser.id });
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }

    const existingEmail = await User.findOne({ email, _id: { $ne: id } });
    if (existingEmail) {
      throw new Error("Email is already in use");
    }
    if (user.email === email) {
      throw new Error("No changes in email.");
    }
  
    user.email = email;

    
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  // const { confirmPwd , pwd, matchPwd } = req.body;
  // if (!req.currentUser.id) {
  //   throw new Error("ID parameter is required.");
  // }

 // const user = await User.findOne({ _id: req.currentUser.id });
 const { confirmPwd , pwd, matchPwd,id } = req.body;
 console.log(confirmPwd , pwd, matchPwd,id);
 try{
   const user = await User.findOne({ _id: id });
  const match = await bcrypt.compare(confirmPwd, user.password);

  if(match){
    if(confirmPwd===pwd){
      throw new Error("Curent password cannot taken as new password.");
    }
      if(pwd===matchPwd){
      const hashedPwd = await bcrypt.hash(pwd, 10);
      user.password=hashedPwd;
      const result = await user.save();
      res.status(200).send(result);
  }else{
    throw new Error("New and Re-password is not matched.");
  }
}
else{
  throw new Error("Current password is not matched.");

}

 } catch (error) {
  res.status(400).send({ error: error.message });
}
 
};


module.exports = { updateName,updateEmail,updatePassword };
