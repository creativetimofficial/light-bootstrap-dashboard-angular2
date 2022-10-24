const express=require('express');
const router=express.Router();
const cors=require('cors');
const md5=require('md5');
const EmployeePerformance=require('../models/employee-performance');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors())

router.post('/employeeperformance', async function(req,res){
    const fullname=req.body.fullname;
    const performance_goals=req.body.performance_goals;
    const key_performance_measures=req.body.key_performance_measures;
    const Job_holder_comment=req.body.Job_holder_comment;
    const score=req.body.score;
    const rating=req.body.rating;


    const employeeperformance=  new EmployeePerformance({
             fullname:fullname,
             performance_goals:performance_goals,
             key_performance_measures:key_performance_measures,
             Job_holder_comment:Job_holder_comment,
             score:score,
             rating:rating,
             date:Date.now()
        }
    )
   const employee= employeeperformance.save();
   employee.then(docs=>{
       res.status(200).json({message:"Employee Performance Added",docs})
   }).catch(error=>{
       console.log('Error adding data',error)
   })


})

module.exports=router;