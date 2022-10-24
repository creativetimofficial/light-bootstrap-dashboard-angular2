const mongoose = require('mongoose');
const DepositSchema={
   accountnumber:String,
   firstname:String,
   lastname:String,
   amount:Number
   
}
const CreateDeposit=mongoose.model("deposits",DepositSchema);
module.exports=CreateDeposit;
