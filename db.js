///file to write the connection between database and node.js

const mongoose = require("mongoose");
require("dotenv").config();
//Define the MongoDB connection URL

//const mongoURL = "mongodb://127.0.0.1:27017/hotels";//(localhost/local database)
// const mongoURL = "mongodb+srv://hotels:node_hotels@hotels.fx1g7xr.mongodb.net/";  //("online database")
const mongoURL = process.env.MONGODB_URL_LOCAL 
// const mongoURL = process.env.MONGODB_URL ;
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
