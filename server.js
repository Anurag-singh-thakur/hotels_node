//Finally creating a new server (server === waiter)

const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const MenuItem = require("./models/MenuItem");

const passport = require("./auth");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //req.body 

app.use(bodyParser.json()); // store the data in the req.body (Request body)
const PORT = process.env.PORT || 3000; // if the port is not specified in .env file it will use 3000

//definig middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}]request made to: ${req.originalUrl}`
  );
  next(); // Move on to the next phase
};

app.use(logRequest); //middleware is used before any routes


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./Routes/personRoutes");
const menuItemRoutes = require("./Routes/menuItemRoutes");

app.use("/person",  localAuthMiddleware, personRoutes);
app.use("/menu",menuItemRoutes);



app.listen(PORT, () => {
  console.log("server is listening on port 3000!");
});
