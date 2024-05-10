require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const allowedOrigins = require('./config/allowedOrigins');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 8080



connectDB()


app.use(cors({
  origin: allowedOrigins
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





console.log("server");
app.use("/cou", require("./routes/api/course"));





mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});