const express = require('express');
const userController=require('../controller/user');
const router = express.Router();
const passport=require('passport');
const csvcontroller=require('../controller/csv');
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signIn'}
),userController.create_session);
router.get('/signOut',userController.destory_session);
router.get('/signIn',userController.signIn);
router.get('/csv/downloadcsv',csvcontroller.csvload);
module.exports = router;