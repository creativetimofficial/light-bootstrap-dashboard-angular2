const User=require('../models/User');
exports.createUser=async (req,res,next)=>{
   const createUser=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
    email:req.body.email,
    dob:req.body.dob,
    password:req.body.password,
   created_at:req.body.created_at,
   account_number:req.body.account_number,
   address:req.body.address,
   phone:req.body.phone,
   grant_access:true
   })
  await createUser.save().then(docs=>{
  res.status(200).json({message:"User has been successfully created",docs})
}).catch(error=>{
 res.status(500).json({message:error})
})

}


exports.allUsers=async (req,res,next)=>{
 await User.find({}).then(docs=>{
  res.status(200).json({"data":docs})
 }).catch(error=>{
  res.status(400).json({"message":error})
 }) 
}
//
exports.blockUser=(req,res,next)=>{
  User.findById(req.params.id,function(err,information){
    
   if(err){
       res.status(500).json({"error":err});
    }
     //let get the id of the selected user then we update grant_access from true to false;
  const selected_id=information._id;
 User.findByIdAndUpdate(selected_id, {"grant_access":"false"}, 
    function (err, docs) {                          
if(err){
console.log(err.message)
}
if(docs){
res.status(200).json({message:"you have successfully blocked this user",docs})
}
})

  })
}


//
exports.AllblockUsers=(req,res,next)=>{

   //blocked users have a false grant access;
   User.find({grant_access:'false'}).then(docs=>{
    res.status(200).json({"data":docs})
   }).catch(error=>{
    res.status(401).json({message:error})
   })

}
  
exports.unblockUsers=(req,res,next)=>{
  User.findById(req.params.id,function(err,information){
    if(err){
        res.status(500).json({"error":err});
     }
     console.log(req.params.id)
      //let get the id of the selected user then we update grant_access from true to false;
   const selected_id=information._id;
  User.findByIdAndUpdate(selected_id, {"grant_access":"false"}, 
     function (err, docs) {                          
 if(err){
 console.log(err.message)
 }
 if(docs){
 res.status(200).json({message:"you have successfully blocked this user",docs})
 }
 })
 
   })
}













