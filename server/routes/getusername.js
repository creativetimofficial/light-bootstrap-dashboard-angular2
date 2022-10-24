const express=require('express');
const router=express.Router();
const session=require("cookie-session");
const MongoDbStore = require('connect-mongo');
const mongoDB=process.env.MONGO_PASSWORD;
router.use(session({cookie:{
        secure: true,
        maxAge:120000
           },
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: mongoDB
    
    })
    }));
    
  
  
    router.use(function(req,res,next){
      if(!req.session){
        res.redirect("/")
          return next(new Error('Oh no')) //handle error
  
      }
      next() //otherwise continue
      });

router.get("/getusername",(req,res)=>{
    username=req.session.username;
    res.json(username)
  })
  module.exports=router;