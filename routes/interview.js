const express = require('express');

const router = express.Router();
const interview=require('../controller/interview');
router.post('/createInterview',interview.createInterview);
router.get('/addInterview',interview.addInterview);
router.get('/interview_details/:id',interview.showdetails);
module.exports=router;