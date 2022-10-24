const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
const bodyparser = require('body-parser');
const verifyToken=require("../routes/check")
const cors=require('cors')
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors());


router.get('/finduserinfo',function(req,res){  
    const username=req.body.username;
    AddUser.find({'username' : new RegExp(username, 'i')}, function(err, docs){
    res.json(docs)
    })
  
  })
  module.exports=router;