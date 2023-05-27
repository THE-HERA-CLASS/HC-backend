const express = require('express');
const router = express.Router();
const multer = require('multer');

const ExamController = require('../controllers/exam.controller.js');
const examController = new ExamController();

const storage = multer.memoryStorage(); // 메모리에서 파일 처리
const upload = multer({ storage: storage });

router.post('/upload_word', upload.single('file'), examController.upload_word); // parse docx
router.post('/upload_office', upload.single('file'), examController.upload_office); // parse office

module.exports = router;
