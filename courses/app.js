const express = require("express");
require("dotenv").config();
require("colors");
require("express-async-errors");
const cors = require("cors");
const { errorHandler } = require("./middleware/error-handler");
const { currentUser } = require("./middleware/current-user");

const courseRoutes = require("./routes/course.routes");

const app = express();

// make sure express is aware that it is behind a proxy of ingress-nginix and it should still trust traffic as being secure even though it is coming from that proxy
app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(currentUser);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/courses", courseRoutes);

app.use(errorHandler);

module.exports = { app };
