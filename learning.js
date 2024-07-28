// console.log("server file is running");

// function add(a ,b){
//     return a + b;
// }

// var result  = add(38,54);

// console.log(result);

// var add = function add(a ,b){
//     return a + b;
// }

// var result  = add(38,54);
// console.log(add) ;

// var add = (a ,b) =>{
//      return a + b;
// }

// var add = (a ,b)=> a+b ;
// var result = add(38,54);
// console.log(result);

// ( function (a,b){
//     console.log(a+b);
// })(3,5);
// callback function in javascript
// function callback(){
//     console.log("callback function");
// }
//  const add = function (a , b , callback){
//     var result =  a+ b ;
//     console.log("result is" + result) ;
//     callback();
//  }

//  add (3,454882555514 , callback) ;

// const add = function ( a , b , anurag){
//     var result =  a+ b ;
//     console.log("result is" + result) ;
//     anurag();

// }

// add (3,454882555514 , function(){
//     console.log("callback function");
// }) ;

// add ( 2,3, ()=> console.log("Anurag singh thakur"))

// var fs = require("fs");
// var os = require("os");

// var user =  os.userInfo() ;
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt' , 'hi ' + user.username + '!\n' ,()=>{
//     console.log("file created successfully");
// });

// console.log(os) ;
// console.log("now fs")
// console.log(fs) ;

// var _ = require('lodash');
// const notes  = require('./notes');
// console.log("server file available" );
// var age  = notes.age;
// var name = notes.name;

// var result =  notes.addNumber(age + 80 ,10) ;

// console.log(age);
// console.log(name);
// console.log("Result is now " + result);

// var data = ['person' , 'person' ,1 ,2,1,2,'name' , 'age' , '2'] ;

// var filter = _.uniq(data) ;
// console.log(filter);

// console.log(_.isString(89));
// console.log(_.isString('ANruag'));

// console.log(_.isArray([1,2,3]));

//video 4 begins here :

// Express js tutorial

// const jsonString  = '{"name":"john","age":30, "city":"London"}' ;
// const jsonObject = JSON.parse(jsonString) ;

// console.log(jsonObject);

// const objectToConver = {
//   name: "John",
//   age: 43,
// };

// const jsonString2 = JSON.stringify(objectToConver);
// console.log(jsonString2);
// console.log(typeof(jsonString2));


//   app.get('/food', function (req, res) {
    //     var c stomized_food = {
    //         name:"Aaloo Matar",
    //         sizes :"half plate or full plate",
    //         is_salad :true,
    //         is_wine: false 
    //     }
    //     res.send(customized_food);
        
    //   });
    //   app.get('/clothes', function (req, res) {
    //     var customized_cloth = {
    //         name:"Capri or Cargo Pants",
    //         sizes :"Available in Different Sizes",
    //         is_pocket :true,
    //         color :"Green",
    //     }
    //     res.send(customized_cloth);
        
    //   });
     
      
    