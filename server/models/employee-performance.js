const mongoose = require('mongoose');
const CreateEmployeeSchema={
    fullname:String,
    performance_goals:String,
    key_performance_measures:String,
    Job_holder_comment:String,
    score:String,
    rating:String,
    checkappraisal:{
        type:String,
        default:'No'
    },
    appraisalinformation:String
   
}
const EmployeePerformance=mongoose.model("employeeperformance",CreateEmployeeSchema);
module.exports=EmployeePerformance;
