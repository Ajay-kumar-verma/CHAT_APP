const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
res.send("Server is up and running !");
})

router.get('/chat',(req,res)=>{
    res.send(" This is chat page !");
  })

router.get('*',(req,res)=>{
 res.send("Invalid Link !");
    })
            


module.exports=router;
//Router is use for creating Router 
//this is use as middleWare 

