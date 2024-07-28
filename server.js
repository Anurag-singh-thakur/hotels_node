//Finally creating a new server (server === waiter)

const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(bodyParser.json()); // store the data in the req.body (Request body)
const PORT = process.env.PORT || 3000; // if the port is not specified in .env file it will use 3000

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

//   app.get('/chicken', function (req, res) {
//     res.send('Sorry sir , it is not available ');
//   });

//   app.get('/idli', function (req, res) {
//     var customized_idli = {
//         name:"rava idli",
//         sizes :"10 cm diameter",
//         is_sambhar :true,
//         is_chatni : false
//     }
//     res.send(customized_idli);

//   });
//   app.post('/items' ,(req, res) => {
//     console.log('data received');
//     res.send('data saved');
//   })
// app.post("/person", async (req, res) => {
// const data = req.body; //assuming the request body contains the person data
// const newPerson =  new Person();
// newPerson.name = data.name;
// newPerson.age = data.age;
// newPerson.mobile = data.mobile;
// newPerson.email = data.email;
// newPerson.address = data.address;

//to avoid the above 6 lines what we did we just pass the data into the Person ...check below
// const newPerson = new Person(data);
// newPerson.save((error, savedPerson) => {
//   if (error) {
//     console.log("Error on saving persons data", error);
//     res.status(500).json({ error: "internal server error" });
//   } else {
//     console.log("data saved successfully");
//     res.status(201).json(savedPerson);
//   }
// });

//the above save  method with callback is not used now because it ismore complicated so we use async await now

// try {
//   const data = req.body; //Assuming the request body contains the person data
//create a new Person document using mongoose model

// const newPerson = new Person(data);
//save the newPerson to the database
// const response = await newPerson.save();
// console.log("data saved", response);
// res.status(200).json(response);
//   } catch (err) {
//     console.log("error ");
//     res.status(500).json({ error: "internal server error" });
//   }
// });

///get method to get the person data

// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("data fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log("error ");
//     res.status(500).json({ error: "internal server error" });
//   }
// });

// app.post("/menu", async (req, res) => {
//   try {
//     const Data = req.body; //Assuming the request body contains the menu data
//     //create a new MenuItem document using mongoose model

//     const newMenu = new MenuItem(Data);

//     const response = await newMenu.save();
//     console.log("data saved2 ", response);
//     res.status(200).json(response);
//   } catch (err) {
//     console.log("error2");
//     res.status(500).json({ error: "internal server error2" });
//   }
// });

// app.get("/menu", async (req, res) => {
//   try {
//     const Data = await MenuItem.find();
//     console.log("data fetched2");
//     res.status(200).json(Data);
//   } catch (err) {
//     console.log("error ");
//     res.status(500).json({ error: "internal server error" });
//   }
// });

// app.get("/person/:workType", async (req, res) => {
//   try {
//     const workType = req.params.workType;
//     if (workType === "chef" || workType === "manager" || workType === "waiter") {
//       const response = await Person.find({ work: workType });
//       console.log("response fetched");
//       res.status(200).json(response);
//     } else {
//       res.status(404).json({ error: "Invalid work type" });
//     }
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

const personRoutes = require("./Routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./Routes/menuItemRoutes");
app.use("/menu", menuItemRoutes);

//all the commented code is moved to the routes using express routes so it is working same even if it is not commented and routes files are not defined .

app.listen(PORT, () => {
  console.log("server is listening on port 3000!");
});
