const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//define the persons schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String, 
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile : {
    type : String ,
    required : true ,
  } ,
  email :{
    type : String ,
    required : true ,
    unique : true ,
  } ,
  address :{
    type : String ,
    required : true ,
  } , 
  salary :{
    type : Number ,
    required : true ,
  },
  username:{
    required : true ,
    type : String ,
    unique : true 

  },
  password:{
    type : String ,
    required : true ,
  
  }

});
personSchema.pre('save' , async function(next){
  const person = this ; 
    //hash the password only if it has been modified (or is new)

  if(!person.isModified('password')) 
    return next() ;
  try{
    //hash password generation 
    const salt =  await bcrypt.genSalt(10) ;
    //hash paaword 
    const hashedPassword = await bcrypt.hash(person.password , salt) ;
    //override password with the hashed password
    person.password = hashedPassword ;  //update the password field with the hashed version
    next() ;
  }catch(err){
    return next(err) ;
  }
});

personSchema.methods.comparePassword = async function(candidatePassword){

  try{
    //use bcrypt to compare the provided password with the provided password
    const isMatch = await bcrypt.compare(candidatePassword , this.password) ;
    return isMatch ;
  }catch(err)
  {
      throw err ; 

  }
}
//how hash and compare works 

//anurag ---> djjjjjjfdjfiefdfdfff
//login ---> dhhh(wrong wala password);
//dnidfidfiefififefi(new pass se generated hash)--> extract salt ; 
//salt+wrong password ko purane hash jo generate hua tha usse compaere kia jaayega 

//create person model  

 const person = mongoose.model('Person' , personSchema) ;

 module.exports = person ;