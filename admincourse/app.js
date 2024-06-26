const express = require("express");
require("dotenv").config();
require("colors");
require("express-async-errors");
const cookieSession = require("cookie-session");
const { errorHandler } = require("./middleware/error-handler");
const { currentUser } = require("./middleware/current-user");
const cors = require('cors');
const userRoutes = require("./routes/course.routes");

const app = express();
app.use(cors());

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.use("/api/admincourse", userRoutes);

app.use(errorHandler);

module.exports = { app };
