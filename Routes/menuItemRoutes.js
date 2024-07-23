const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const Data = req.body; //Assuming the request body contains the menu data
    //create a new MenuItem document using mongoose model

    const newMenu = new MenuItem(Data);

    const response = await newMenu.save();
    console.log("data saved2 ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("error2");
    res.status(500).json({ error: "internal server error2" });
  }
});

router.get("/", async (req, res) => {
  try {
    const Data = await MenuItem.find();
    console.log("data fetched2");
    res.status(200).json(Data);
  } catch (err) {
    console.log("error ");
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:Taste", async (req, res) => {
  try {
    const Taste = req.params.Taste;
    if (Taste == "spicy" || Taste == "sweet" || Taste == "sour") {
      const response = await MenuItem.find({ taste: Taste });
      console.log("response fetched");
      console.log(response, "response");
      res.status(200).json(response);
    } else {
      res
        .status(404)
        .json({ error: "Food item is not available for this taste " });
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router; 
