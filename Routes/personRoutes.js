const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

// router.use(express.json());
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newPerson = new Person(data);

    //corrected by SAGAR
    // const newPerson = new Person({
    //   name:data.name,
    //   age:data.age,
    //   mobile:data.mobile,
    //   email:data.email,
    //   work:data.work,
    //   address:data.address,
    // });
    //save the newPerson to the database
    const response = await newPerson.save();
    console.log("data saved", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("error ");
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log(data);
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("error ");
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      console.log(response, "response");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: "internal server error" });
  }
});

//updation in the data usinfg put

router.put('/:id', async (req, res) => {
  //here id is the variable and it can be anything

  try {
    const personId = req.params.id; //get the id from the URL paraser
    const updatedData = req.body; //get the updated data from the request body


    // if (!isValidObjectId(personId)) {
    //   return res.status(400).json({ error: "Invalid person ID format" });
    // }


    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true, //return the updated data
      runValidators: true, //to validate the updated data before updating it in the database
    });

    if(!response){
      return res.status(404).json({
        error: "Person not found with this ID"
      })
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: "internal server error" });
  }
});

// module.exports = router;
module.exports = router;
