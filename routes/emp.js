const express = require('express');

const router = express.Router();
const emp=require('../controller/emp')
router.get('/submit',emp.create);


module.exports=router;