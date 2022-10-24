const express=require('express');
const router=express.Router();
const cors=require('cors');
const deposit=require('../controller/Funds');
const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cors())

router.post('/depositfunds', deposit.depositfunds);

module.exports=router;