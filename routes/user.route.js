const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');
const userController = new UserController();

router.get('/emailExists/:email', userController.emailExists); // 이메일 존재 확인
router.get('/nicknameExists/:nickname', userController.nicknameExists); // 닉네임 존재 확인
router.post('/signup', userController.signup); // 회원가입
router.delete('/withdrawal/:user_id', userController.withdrawal); // 회원탈퇴
router.get('/profile/:user_id', userController.getProfile); // 회원정보 조회
router.put('/profile/:user_id', userController.updateProfile); // 회원정보 수정

module.exports = router;
