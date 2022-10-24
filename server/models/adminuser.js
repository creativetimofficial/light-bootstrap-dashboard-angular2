const mongoose = require('mongoose');
const CreateAdminSchema={
    username:String,
    password:String, 
}
const CreateAdminUser=mongoose.model("createadmin",CreateAdminSchema);
module.exports=CreateAdminUser;
