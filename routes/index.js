const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const examinfoRouter = require('./examinfo.route.js');
const examRouter = require('./exam.route.js');

router.use('/', [userRouter, examinfoRouter, examRouter]);

module.exports = router;
