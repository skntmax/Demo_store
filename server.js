const express = require('express')  
const app = express();
const port = 5000 || process.env.PORT
const hbs = require('hbs');
const bodyParser= require('body-parser')
const axios = require('axios')  
const  fs = require('fs')
// const fetch = require('node-fetch');
const fetch = require('cross-fetch');
const cartModel=  require('./db/db');
app.set('view engine' ,'hbs')
hbs.registerPartials( __dirname+"/component/" )
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(__dirname+"/css/"))



app.get('/home' ,(req,res)=>{
   res.redirect('/')
})

app.get('/' , async (req,res)=>{     
    
  try {
        const data = await axios.get('http://fakestoreapi.com/products')
        const all_data=await JSON.parse(JSON.stringify( data.data ) ) 
         
        const count  =await cartModel.count( {} ) 
        await res.render('cart/index' , { data:all_data ,count } )
     } catch (error) {
       console.error(error)
     }
})




app.get('/products/' , async (req,res)=>{ 
  let item_id = req.query.id ;  
  try {
    let items; 
    let result = await axios.get('https://fakestoreapi.com/products/'+item_id)
    await console.log(result.data ) ;
    items= await result.data
    const count  =await cartModel.count({})

    res.render('cart/checkout' , { data : items , count } )
  
}
  catch (error) {
   console.error(error)
  }
})




app.get('/checkout' ,async (req,res) =>{ 
  const all_results  =await cartModel.find()
  const count  =await cartModel.count({})
  if(all_results)
  res.render('cart/cart'  ,{ all_results,count }) 

})






app.get('/cart/:id' ,async (req,res) =>{
  const id = req.params.id
  let cartresult = await axios.get('https://fakestoreapi.com/products/'+id)
  let added_in_cart= await  cartresult.data ;

const result=  new cartModel({
  image: added_in_cart.image , 
title: added_in_cart.title , 
description: added_in_cart.description, 
price : added_in_cart.price
 } ) 

 if (await result.save() ){ 
        res.redirect('/checkout')
  }
 
 else{
    console.log('not saved ')
   }
})


app.listen(port, ()=>{ 
    console.log(`server started at ${port}`)
})