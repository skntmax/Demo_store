// const router = require('express').Router
const mongoose= require('mongoose')


mongoose.connect("mongodb://localhost:27017/fakestore", {

   useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {

    console.log(" \' fake store \' =>  database connected  ");

}).catch(err => {

    console.log(err + "this is that error ")

})

 
const cartmodel= mongoose.model('cart' , {
     image:{
          type:String
     },
     title:{
        type:String
   } ,
   description:{
    type:String
    } ,
    price : {
          type:Number
    }
}) 


module.exports = cartmodel 