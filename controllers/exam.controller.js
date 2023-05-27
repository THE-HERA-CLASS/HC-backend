const mammoth = require('mammoth');
const ExamService = require('../services/exam.service.js');

class ExamController {
  examService = new ExamService();

  upload_word = async (req, res) => {
    const { exam_id } = req.body;
    if (!req.file) {
      return res.status(411).json({ errMsg: '값 없음: file' });
    }
    const buffer = req.file.buffer;
    try {
      const parsing = await mammoth.extractRawText({ buffer });
      const text = parsing.value;
      const text_ntobr = text.replace(/\n/gi, '<br>'); // \n -> <br> 변환
      const question_array = text_ntobr
        .split('<br><br><br><br><br><br><br><br>')
        .map((row) => row.trim());
      const result = await this.examService.addQuestion(exam_id, question_array);
      res.status(200).json({ parsingData: result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '파싱 실패' });
    }

    // const result = await this.examService.addQuestion(exam);
  };

  upload_office = async (req, res) => {
    try {
      // const { exam_id } = req.body;
      // if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      if (!req.file) return res.status(411).json({ errMsg: '값 없음: file' });
      const buffer = req.file.buffer;
      const parsing = await mammoth.convertToHtml({ buffer });
      const text = parsing.value;
      let html = text.replace(/<p>/gi, '');
      html = html.replace(/<\/p>/gi, '\n');
      const question_array = html.split('```').map((row) => row.trim());
      const result = await this.examService.addQuestion2(question_array);
      res.status(200).json({ parsingData: result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '파싱 실패' });
    }
  };
}

module.exports = ExamController;
