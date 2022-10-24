const express=require('express');
const router=express.Router();
const EmployeePerformance=require('../models/employee-performance');
const cors=require('cors');
router.use(cors());
router.get('/getallemployeeobjectives',async function(req,res){

EmployeePerformance.find({}, function(err, docs){
    res.json(docs)
    })
})


module.exports=router;