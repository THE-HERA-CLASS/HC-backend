const express = require('express');
const router = express.Router();

const ExaminfoController = require('../controllers/examinfo.controller.js');
const examinfoController = new ExaminfoController();

router.post('/major', examinfoController.addMajor);
router.get('/major', examinfoController.getMajors);
router.put('/major/:major_id', examinfoController.updateMajor);
router.delete('/major/:major_id', examinfoController.dropMajor);

router.post('/certificate', examinfoController.addCertificate);
router.get('/certificate', examinfoController.getCertificate);
router.get('/certificate/withMajorId/:major_id', examinfoController.getCertificateWithMajorId);
router.put('/certificate/:certificate_id', examinfoController.updateCertificate);
router.delete('/certificate/:certificate_id', examinfoController.dropCertificate);

router.post('/subject', examinfoController.addSubject);
router.get('/subject', examinfoController.getSubject);
router.get('/subject/withCertificateId/:certificate_id', examinfoController.getSubjectWithCertificateId);
router.put('/subject/:subject_id', examinfoController.updateSubject);
router.delete('/subject/:subject_id', examinfoController.dropSubject);

router.post('/exam', examinfoController.addExam);
// router.get('/exam', examinfoController.getExam);

module.exports = router;
