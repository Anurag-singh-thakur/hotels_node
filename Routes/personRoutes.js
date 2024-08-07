const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
// router.use(express.json());
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));

    const token = generateToken(payload);
    console.log("token generated:", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log("error generating token", err);
    res.status(500).json({ error: "internal server error" });
  }
});
//login route
router.post('/login', async(req, res) => {
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await Person.findOne({username: username});

      // If user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid username or password'});
      }

      // generate Token 
      const payload = {
          id: user.id,
          username: user.username
      }
      const token = generateToken(payload);

      // resturn token as response
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/", jwtAuthMiddleware, async (req, res) => {
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
//Profile Route

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user ; 
    console.log("user data is" ,userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
  
    res.status(200).json({user});
   
  } catch (err) {
    console.log("error ", err);
    res.status(500).json({ error: "internal server error" });
  }
});



// router.get("/:workType", async (req, res) => {
//   try {
//     const workType = req.params.workType;
//     if (workType == "chef" || workType == "manager" || workType == "waiter") {
//       const response = await Person.find({ work: workType });
//       console.log("response fetched");
//       console.log(response, "response");
//       res.status(200).json(response);
//     } else {
//       res.status(404).json({ error: "Invalid work type" });
//     }
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).json({ error: "internal server error" });
//   }
// });

//updation in the data using put

// router.put("/:id", async (req, res) => {
//   //here id is the variable and it can be anything

//   try {
//     const personId = req.params.id; //get the id from the URL paraser
//     const updatedData = req.body; //get the updated data from the request body

//     const response = await Person.findByIdAndUpdate(personId, updatedData, {
//       new: true, //return the updated data
//       runValidators: true, //to validate the updated data before updating it in the database
//     });

//     if (!response) {
//       return res.status(404).json({
//         error: "Person not found with this ID",
//       });
//     }
//     console.log("data updated ", response);
//     res.status(200).json(response);
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).json({ error: "internal server error" });
//   }

//});

// router.delete("/:id", async (req, res) => {
//   try {
//     const personId = req.params.id;

//     //asumming you have a Person model
//     const response = await Person.findByIdAndRemove(personId);
//     if (!response) {
//       return res.status(404).json({
//         error: "Person not found with this ID",
//       });
//     }
//     console.log("data deleted ");
//     res.status(200).json({message :"person deleted successfully"});
//   } catch (err) {
//     console.log("error ", err);
//     res.status(500).json({ error: "internal server error" });
//   }
// });
module.exports = router;
