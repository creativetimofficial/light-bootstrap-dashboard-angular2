const express=require('express');
const router=express.Router();
const EmployeePerformance=require('../models/employee-performance');
const bodyparser = require('body-parser');
const cors=require('cors');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors());


router.put('/managersendappraisal/:id',function(req,res){
  const checkappraisal=req.body.checkappraisal;
  const appraisalinformation=req.body.appraisalinformation;
   const id=req.params.id;

  EmployeePerformance.findByIdAndUpdate(id, {checkappraisal:checkappraisal,appraisalinformation:appraisalinformation}, 
        function (err, docs) {                          
 if(err){
   console.log(err.message)
 }
 if(docs){
  res.status(200).json({message:"data updated successfully",docs})
}
})
})


module.exports=router;