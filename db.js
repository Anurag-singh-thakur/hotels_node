///file to write the connection between database and node.js

const mongoose = require("mongoose");

//Define the MongoDB connection URL

const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //you can replace ,mydatabase with any database name you want

//Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//define event listeners for database connection
db.on("connected", () => {
  console.log("connected to MongoDB Server");
});
db.on("error", (error) => console.error("Connection error:", error));

db.on("disconnected", () => {
  console.log(" MongoDB disconnected ");
});

//export to database connection 
module.exports = db ;
