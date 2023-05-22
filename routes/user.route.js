const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const userController = new UserController();

router.get('/emailExists/:email', userController.emailExists); // 이메일 존재 확인
router.get('/nicknameExists/:nickname', userController.nicknameExists); // 닉네임 존재 확인

module.exports = router;
