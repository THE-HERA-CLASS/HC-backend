const mammoth = require('mammoth');
const cheerio = require('cheerio');
const ExamService = require('../services/exam.service.js');

class ExamController {
  examService = new ExamService();

  upload_word = async (req, res) => {
    if (!req.file) {
      return res.status(411).json({ errMsg: '값 없음: file' });
    }

    const buffer = req.file.buffer;

    let question_result = [];
    let question_object = {};

    try {
      const parsing = await mammoth.extractRawText({ buffer });
      const text = parsing.value;
      const text_ntobr = text.replace(/\n/gi, '<br>'); // \n -> <br> 변환
      const question_array = text_ntobr
        .split('<br><br><br><br><br><br><br><br>')
        .map((row) => row.trim());
      question_array.forEach((item, index) => {
        const dot_index = item.indexOf('. ');
        const billiard_index = item.indexOf('※ ');
        if (dot_index > 0) {
          // 문제유형
          const sort_num = index + 1;
          const question_num = item.substring(0, dot_index);
          const other = item.substring(dot_index + 2, item.length);
          if (other.indexOf('<br><br><br><br>') > 0) {
            
          }
          question_object = {
            sort_num,
            question_num,
            question,
          };
          question_result.push(question_object);
        } else if (billiard_index === 0) {
          // 알림유형
          const sort_num = index + 1;
          const question = item.substring(billiard_index + 2, item.length);
          question_object = {
            sort_num,
            question,
          };
          question_result.push(question_object);
        }
      });

      res.status(200).json({ parsingData: question_result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '파싱 실패' });
    }

    // const result = await this.examService.addQuestion(exam);
  };
}

module.exports = ExamController;
