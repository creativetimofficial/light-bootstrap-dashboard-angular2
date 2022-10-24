const express=require('express');
const router=express.Router();
const cors=require('cors');
const PersonalDevelopment=require('../models/personaldevelopment');//models to create a user
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors())

router.post('/personaldevelopment', async function(req,res){

     const fullname=req.body.fullname;
    const Personal_learning_and_devt_goals=req.body.Personal_learning_and_devt_goals
    const Manager_support=req.body.Manager_support;
    const Activity_to_achieve_goal=req.body.Activity_to_achieve_goal;
    const Job_holder_comment=req.body.Job_holder_comment;
    const score=req.body.score;
    const rating=req.body.rating;

    
    const personal=  new PersonalDevelopment({
             fullname:fullname,
             Personal_learning_and_devt_goals:Personal_learning_and_devt_goals,
            Manager_support:Manager_support,
            Activity_to_achieve_goal:Activity_to_achieve_goal,
              Job_holder_comment:Job_holder_comment,
              score:score,
              rating:rating
            
        }
    )
   const person= personal.save();
   person.then(docs=>{
       res.status(200).json({message:"Registration successful",docs})
   }).catch(error=>{
       console.log('This is an error',error)
   })


})

module.exports=router;