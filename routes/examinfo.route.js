const express = require('express');
const router = express.Router();

const ExaminfoController = require('../controllers/examinfo.controller.js');
const examinfoController = new ExaminfoController();

router.post('/major', examinfoController.addMajor); // 전공 추가
router.get('/major', examinfoController.getMajors); // 전공 보기
router.put('/major/:major_id', examinfoController.updateMajor); // 전공 수정
router.delete('/major/:major_id', examinfoController.dropMajor); // 전공 삭제

router.post('/certificate', examinfoController.addCertificate); // 자격증 추가
router.get('/certificate', examinfoController.getCertificate); // 자격증 보기
// router.put('/certificate/:certificate_id', examinfoController.updateCertificate); // 자격증 수정
// router.delete('/certificate/:certificate_id', examinfoController.dropCertificate); // 자격증 삭제

// router.post('/subject', examinfoController.addSubject); // 과목 추가
// router.get('/subject', examinfoController.getSubject); // 과목 보기
// router.put('/subject/:subject_id', examinfoController.updateSubject); // 과목 수정
// router.delete('/subject/:subject_id', examinfoController.dropSubject); // 과목 삭제

module.exports = router;