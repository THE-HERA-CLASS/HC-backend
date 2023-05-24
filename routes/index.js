const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const loginRouter = require('./login.route.js');

router.use('/', [userRouter]);
router.use('/', [loginRouter]);

module.exports = router;
