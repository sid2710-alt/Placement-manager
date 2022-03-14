const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');
const mongoose=require('../config/mongoose');

console.log('router loaded');

router.get('/', homeController.show);
router.get('/mainscreen/render',homeController.show);
router.use('/emp',require('./emp'));
router.use('/user',require('./user'));
router.use('/student',require('./student'));
router.use('/interview',require('./interview'));
// router.use('/users', require('./users'));
// router.use('/posts', require('./posts'));
// router.use('/comments', require('./comments'));


// router.use('/api', require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;