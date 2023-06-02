const express = require('express');
const router = express.Router();
const multer = require('multer');

const ExamController = require('../controllers/question.controller.js');
const examController = new ExamController();

const storage = multer.memoryStorage(); // 메모리에서 파일 처리
const upload = multer({ storage: storage });

router.post('/upload_word', upload.single('file'), examController.upload_word);

module.exports = router;
