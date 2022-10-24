
const jwt=require("jsonwebtoken");

 decodedtoken='';
function verifyToken(req,res,next){
let token=req.query.token;
jwt.verify(token,'secret',function(err,tokendata){
  if(err){
    return res.status(400).json("unauthorized request")
  }
  if(tokendata){
  decodedtoken=tokendata;
  console.log('my username is',decodedtoken.username)
  next();
  }
})

}
module.exports=verifyToken