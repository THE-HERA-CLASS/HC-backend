const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const examinfoRouter = require('./examinfo.route.js');
const examRouter = require('./exam.route.js');
const loginRouter = require('./login.route.js');

router.use('/', [userRouter, loginRouter, examinfoRouter, examRouter]);

module.exports = router;
