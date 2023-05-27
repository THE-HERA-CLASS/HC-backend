const express = require('express');
const router = express.Router();

const ExaminfoController = require('../controllers/examinfo.controller.js');
const examinfoController = new ExaminfoController();

router.post('/major', examinfoController.addMajor); // 전공 추가
router.get('/major', examinfoController.getMajors); // 전공 보기
router.put('/major/:major_id', examinfoController.updateMajor); // 전공 수정
router.delete('/major/:major_id', examinfoController.dropMajor); // 전공 삭제

module.exports = router;
