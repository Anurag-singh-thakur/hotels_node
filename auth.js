const Person = require("./models/Person");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      // authentication logic here
      try {
    //    console.log("Recieved Credentials:", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) return done(null, false, { message: "User not found" });
  
        const isPasswordMatch = await  user.comparePassword(password);
  
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password is incorrect" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
  module.exports = passport ;