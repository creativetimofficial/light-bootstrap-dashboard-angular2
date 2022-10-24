const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');
const bodyparser = require('body-parser');
const cors=require('cors');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors());
router.delete('/deleteuser/:id', function(req,res){
  const  id=req.params.id;
  AddUser.findByIdAndDelete(id, async function (err) {
    await AddUser.find({}).then(data=>{
    res.status(200).json({message:"Delete data successfully",data});
    })
  })

})

module.exports=router;