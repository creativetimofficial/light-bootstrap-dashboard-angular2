const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const port=4000;
const depositfunds=require('./routes/depositfunds');
const User=require('./routes/user');
const getallUsers=require('./routes/getallusers');
const blockuser=require('./routes/blockuser');
app.use(cors());
app.use('/depositfunds',depositfunds);
app.use('/user',User);
app.use('/getallusers',getallUsers);
app.use('/getsingledata',blockuser);


const mongodb='mongodb://localhost:27017/my_bank';
mongoose.connect(mongodb,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
{
  console.log("successfully connected to the database");
}).catch(err=>{
  console.log("error connecting to the database",err)
});

app.listen(4000,()=>{
    console.log("server is running on port "+port);
})

