const mongoose = require("mongoose");

const statisticSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    }
  }
  
);



module.exports = mongoose.model("Statistic", statisticSchema);
