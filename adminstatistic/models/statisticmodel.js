const mongoose = require("mongoose");

const statisticSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  }
  
);



module.exports = mongoose.model("Statistic", statisticSchema);
