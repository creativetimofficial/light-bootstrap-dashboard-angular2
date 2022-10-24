const express=require('express');
const router=express.Router();
const EmployeePerformance=require('../models/employee-performance');
const PersonalDevelopment=require('../models/personaldevelopment');
const cors=require('cors');
router.use(cors());
router.get('/getSingleemployeeobjective/:id',function(req,res){
    EmployeePerformance.findById(req.params.id,function(err,information){
       if(information){
           res.json(information)
       }
       else{
           console.log("error")
       }
    })
})


router.get('/getpersonaldevelopment/:id',function(req,res){
    const employeename=['school'];
    EmployeePerformance.findById(req.params.id,function(err,information){
       if(information){
          let firstname=information.fullname;
           employeename.push(firstname);

           console.log(employeename['1']) 
           let checkname=employeename['1'];
           console.log(checkname)
           PersonalDevelopment.find({'fullname' : new RegExp(checkname, 'i')}, function(err, docs){
            res.json(docs) 
        })
       }
       else{
        res.status(400).json({message:"There was an error proccesing that request please try again"});
       }
     
    })
  
})


module.exports=router;