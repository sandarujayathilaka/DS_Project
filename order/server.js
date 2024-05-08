


const app = require("./app/app");



app.get("/api/v1/order", (req, res) => {
  res.send("Service A test resopnse");
});


// Set the port
const PORT = process.env.PORT || 3000;



// Start the server with app.listen()
app.listen(PORT, () => console.log(`Server running on port number ${PORT}`));
