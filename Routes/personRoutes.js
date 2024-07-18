const express = require('express') 
const router = express.Router() ;
const Person =  require('./../models/Person');
router.post("/", async (req, res) => {
    try {
       const data = req.body; //Assuming the request body contains the person data
      //create a new Person document using mongoose model
  
      const newPerson = new Person(data);
      //save the newPerson to the database
      const response = await newPerson.save();
      console.log("data saved", response);
      res.status(200).json(response);
    } catch (err) {
      console.log("error ");
      res.status(500).json({ error: "internal server error" });
    }
  });
  

  router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch (err) {
        console.log("error ");
        res.status(500).json({ error: "internal server error" });
    }
  })

  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType;
      if (workType === "chef" || workType === "manager" || workType === "waiter") {
        const response = await Person.find({ work: workType });
        console.log("response fetched");
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Invalid work type" });
      }
    } catch (err) {
      console.log("error ", err);
      res.status(500).json({ error: "internal server error" });
    }
  });
  

  // module.exports = router;
  export default router;