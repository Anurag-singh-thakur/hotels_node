const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {
  //first check request headers has authorization or not  ; 

  const authorization = req.headers.authorization ;
  if (!authorization) return res.status(401).json({ error: "token not found" });
  //extract the token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET , {expiresIn:30});
    //Attach user information to the request object
    req.user = decoded;
    next(); // Move on to the next phase
  } catch (err) {
    console.error(err); //log the error for debugging
    return res.status(401).json({ error: "Invalid token" });
  }
};

//function to generate the token 

const generateToken = (userData) => {
  return jwt.sign(userData , process.env.JWT_SECRET); 
};
module.exports = {jwtAuthMiddleware , generateToken};
