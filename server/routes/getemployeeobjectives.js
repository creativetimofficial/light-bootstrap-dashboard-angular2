const express=require('express');
const router=express.Router();
const EmployeePerformance=require('../models/employee-performance');
const cors=require('cors');
router.use(cors());
router.get('/getemployeeobjectives',async function(req,res){
 EmployeePerformance.find({},function(err,docs){
 res.json({"data":docs})
})


})


module.exports=router;