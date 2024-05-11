const { app } = require("./app");
const { connectDB } = require("./config/db");

const start = async () => {
  console.log("Starting up...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  connectDB();

  const port = 4000;

  app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
  });
};

start();
