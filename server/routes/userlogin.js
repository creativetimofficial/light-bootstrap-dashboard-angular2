const express=require('express');
const router=express.Router();
const AddUser=require('../models/createuser');//models to create a user
const bodyparser = require('body-parser');
const cors=require('cors');
// const session=require("express-session");
// const cookie=require("cookie-parser");
const jwt=require("jsonwebtoken");
const md5=require('md5');
const verifyToken=require("../routes/check");
// const oneDay = 1000 * 60 * 60 * 24;
// router.use(session({secret: 'ssshhhhh',saveUninitialized: true,
// cookie: { maxAge: oneDay },
// resave: false}
// ));
// router.use(cookie());
// router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

router.post('/userlogin',function(req,res){
AddUser();
  // req.session.username=req.body.username;
  //   var username=req.session.username;
  //  req.session.password=md5(req.body.password);
  //  var password=req.session.password;
  
  // console.log(req.session.username)
 const username=req.body.username;
 const password=md5(req.body.password);
    AddUser.findOne({username:username},function(err,founduser){
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