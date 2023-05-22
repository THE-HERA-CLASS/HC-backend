const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const userController = new UserController();

router.get('/emailExists/:email', userController.emailExists); // 이메일 존재 확인
router.get('/nicknameExists/:nickname', userController.nicknameExists); // 닉네임 존재 확인
router.post('/signup', userController.signup); // 회원가입
router.delete('/withdrawal', userController.withdrawal); // 회원탈퇴

module.exports = router;
