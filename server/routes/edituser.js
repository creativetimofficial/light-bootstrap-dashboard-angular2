const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const cors=require('cors');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors());


router.put('/edituser/:id',function(req,res){
   const id=req.params.id;
   const firstname=req.body.firstname;
   const lastname=req.body.lastname;
   const username=req.body.username;
   const email=req.body.email;
   const dob=req.body.dob;
  

  AddUser.findByIdAndUpdate(id, {firstname:firstname,lastname:lastname,username:username,email:email,
        dob:dob}, 
        function (err, docs) {                          
 if(err){
   console.log(err.message)
 }
 if(docs){
  res.status(200).json({message:"data updated successfuly",docs})
}
})
 

})


module.exports=router;