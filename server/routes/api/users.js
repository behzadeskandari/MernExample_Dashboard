 const express = require('express');

 let router = express.Router();

 require('dotenv').config();


 const { User } = require('../../models/user.model');


 router.route('/register')
//  .get((req,res)=>{

//  })
 .post((req,res)=>{
    res.status(200).send('ok');
 })

 module.exports = router;