const express = require("express");
require("dotenv").config();
require("colors");
require("express-async-errors");
const cookieSession = require("cookie-session");
const { errorHandler } = require("./middleware/error-handler");
const { currentUser } = require("./middleware/current-user");
const learnerRoutes = require("./routes/learner.routes");
const cors = require("cors"); 


const app = express();

// make sure express is aware that it is behind a proxy of ingress-nginix and it should still trust traffic as being secure even though it is coming from that proxy
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

app.get("/api/learner", (req, res) => {
  res.send("Hello World");
});

app.use("/api/learner", learnerRoutes);
app.use(errorHandler);

module.exports = { app };
