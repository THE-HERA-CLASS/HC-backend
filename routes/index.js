const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const loginRouter = require('./login.route.js');
const imageRouter = require('./image.router.js');


router.use('/', [userRouter]);
router.use('/', [loginRouter]);
router.use('/', [imageRouter]);


module.exports = router;
