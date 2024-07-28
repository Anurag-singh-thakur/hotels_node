const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Create a new menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the menu data
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved: ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get menu items by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (["spicy", "sweet", "sour"].includes(taste)) {
      const response = await MenuItem.find({ taste });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Food item is not available for this taste" });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a menu item by ID
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenu = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenu, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Menu item not found with this ID" });
    }
    console.log("Data updated: ", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a menu item by ID
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    //asumming you have a MenuItem model
    const response = await MenuItem.findByIdAndRemove(menuId);
    if (!response) {
      return res.status(404).json({
        error: "Person not found with this ID",
      });
    }
    console.log("menu deleted ");
    res.status(200).json({message :"menu deleted successfully"});
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
