const mongoose = require('mongoose');
const CreatePersonalSchema={
    fullname:String,
    Personal_learning_and_devt_goals:String,
    Manager_support:String,
    Activity_to_achieve_goal:String,
    Job_holder_comment:String,
    score:String,
    rating:String
   
}
const PersonalDevelopment=mongoose.model("personaldevelopment",CreatePersonalSchema);
module.exports=PersonalDevelopment;
