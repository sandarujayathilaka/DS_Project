const User = require("../models/profilemodel");
const bcrypt = require("bcryptjs");

const updateName = async (req, res) => {
  
  //const { name } = req.body;
  const { name,id } = req.body;
  console.log("updateName",name,id);
  try {
  if (!name) {
    throw new Error("Name is required");
  }

  //const user = await User.findOne({ _id: req.currentUser.id });
  const user = await User.findOne({ _id: id});
  if (user.name === name) {
    throw new Error("No changes in name.");
  }

  if(user){
    user.name = name;
  }else{
    throw new Error("User not found");
  }

  await user.save();

  res.status(201).send(user);
} catch (error) {
  res.status(400).send({ error: error.message });
}
};

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
