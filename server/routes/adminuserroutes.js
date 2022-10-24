const express=require('express');
const router=express.Router();
const CreateAdminUser=require('../models/adminuser');
const bodyparser = require('body-parser');
const cors=require('cors');
const jwt=require("jsonwebtoken");
const md5=require('md5');
const verifyToken=require("../routes/check");
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.post('/managerlogin',function(req,res){
CreateAdminUser();

 const username=req.body.username;
 const password=(req.body.password);
    CreateAdminUser.findOne({username:username},function(err,founduser){
      if(!founduser){
        console.log("wrong username")
        res.status(400).json({error: 'this username is not available ' })
      }
      else{

     if(founduser.password !=password){
      console.log("incorrect password")
      res.status(400).json({ error: 'incorrect password ' })
    }
   else{
     let token =jwt.sign({username:founduser.username},'secret',{expiresIn:'3h'});
     
    
     res.status(200).json(token)
   }
  }
})
});

router.get('/username',verifyToken,function(req,res,next){
return res.status(200).json(decodedtoken.username)

})


module.exports=router;