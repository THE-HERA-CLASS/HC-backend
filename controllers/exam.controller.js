const mammoth = require('mammoth');
const ExamService = require('../services/exam.service.js');

class ExamController {
  examService = new ExamService();

  upload_word = async (req, res) => {
    try {
      const { exam_id } = req.body;
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      if (!req.file) return res.status(411).json({ errMsg: '값 없음: file' });
      const buffer = req.file.buffer;
      const parsing = await mammoth.convertToHtml({ buffer });
      const text = parsing.value;
      let html = text.replace(/<p>/gi, '');
      html = html.replace(/<\/p>/gi, '\n');
      const question_array = html.split('```').map((row) => row.trim());
      const result = await this.examService.addQuestions(exam_id, question_array);
      res.status(200).json({ parsingData: result.addQuestionData });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '파싱 실패' });
    }
  };
}

module.exports = ExamController;
