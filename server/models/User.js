const mongoose = require('mongoose');
const UserSchema={
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    dob:String,
    password:String,
    created_at:String,
    account_number:String,
    address:String,
    phone:String,
    grant_access:Boolean
}
const User=mongoose.model("user",UserSchema);
module.exports=User;
