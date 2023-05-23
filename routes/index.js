const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');
const examinfoRouter = require('./examinfo.route.js');

router.use('/', [userRouter, examinfoRouter]);

module.exports = router;
