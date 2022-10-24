const express=require('express');
const router=express.Router();
const cors=require('cors');
const getsingledata=require('../controller/User');
router.use(cors());
router.get('/getsingledata/:id',getsingledata.blockUser);

module.exports=router;