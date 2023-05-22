const express = require('express');
const router = express.Router();

const userRouter = require('./user.route.js');

router.use('/', [userRouter]);

module.exports = router;
