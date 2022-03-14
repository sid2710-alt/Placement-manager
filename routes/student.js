const express = require('express');

const router = express.Router();
const emp=require('../controller/emp')
router.get('/addStudent',emp.addStudent);
router.post('/create',emp.create);
router.get('/edit-student/:id',emp.edit_Student);
router.post('/update',emp.updateStudent);

module.exports=router;