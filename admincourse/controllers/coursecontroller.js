const Course = require("../models/coursemodel");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");
const updateStatus = async (req, res) => {
 
  try {
    const { feedback,name } = req.body;
     const courseId = req.params.id;
     console.log(req.params.id);
console.log(feedback,name);
     const response = await axios.get(`http://courses-srv:4000/api/courses/${courseId}`);
  if(response.data){
    if(name==="approve"){
      response.data.status="approved";
    }else if(name==="feedback"){
      response.data.status="not approved";
    }
    response.data.chapters


  }
     res.status(response.status).json(response.data);
  } catch (error) {
     console.error("Error fetching course:", error);
  
     res.status(500).json({ error: "Internal Server Error" });
  }
};






module.exports = { updateStatus };
