const express=require('express');
const router=express.Router();
const PersonalDevelopment=require('../models/personaldevelopment');
const cors=require('cors');
router.use(cors());
router.get('/getallpersonaldevelopment',async function(req,res){
    PersonalDevelopment.find({}, function(err, docs){
    res.json(docs)
    })
})


module.exports=router;