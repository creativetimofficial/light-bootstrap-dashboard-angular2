const Deposit=require('../models/depositFunds');
return exports.depositfunds=(req,res,next)=>{
             const accountnumber=req.body.accountnumber;
             const firstname=req.body.firstname;
             const lastname=req.body.lastname;
             const amount=req.body.amount;
 
            const deposit=new Deposit({
               accountnumber:accountnumber,
               firstname:firstname,
               lastname:lastname,
               amount:amount 
         })
       try{
        console.log(req.body)
        deposit.save();
        res.status(200).json({message:"Depositsss made successfully",deposit})
       }catch(error){
        console.log(error)
        res.status(500).json({error:error})
       }

}





