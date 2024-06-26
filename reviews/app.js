const express = require("express");
require("dotenv").config();
require("colors");
require("express-async-errors");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { errorHandler } = require("./middleware/error-handler");
const { currentUser } = require("./middleware/current-user");

const reviewRoutes = require("./routes/review.routes");


const app = express();

app.set("trust proxy", true);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);


app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

module.exports = { app };
