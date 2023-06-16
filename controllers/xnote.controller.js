const XnotesService = require('../services/xnote.service.js');
const ExaminfoService = require('../services/examinfo.service.js');
const QuestionService = require('../services/question.service.js');

class XnotesController {
  xnotesService = new XnotesService();
  examinfoService = new ExaminfoService();
  questionService = new QuestionService();

  submitAnswer = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      let { exam_id, data } = req.body;

      if (!user_id) return res.status(411).json({ errMsg: '값 없음: user_id' });
      if (!exam_id) return res.status(411).json({ errMsg: '값 없음: exam_id' });
      if (!data) return res.status(411).json({ errMsg: '값 없음: data' });

      if (Number(exam_id)) {
        exam_id = Number(exam_id);
      } else {
        return res.status(412).json({ errMsg: '형식 에러: exam_id 숫자만' });
      }

      const examExists = await this.examinfoService.getExamWithExamId(exam_id);
      if (!examExists) return res.status(416).json({ errMsg: `데이터 없음: exam_id: ${exam_id} 시험지` });

      const reqCount = data.length;
      const resCount = await this.xnotesService.submitAnswer(user_id, exam_id, data);

      if (reqCount === resCount) {
        return res.status(200).json({ msg: '답안 제출 완료' });
      } else if (resCount > 0) {
        return res.status(419).json({ errMsg: '답안 제출 부분 실패' });
      } else {
        return res.status(419).json({ errMsg: '답안 제출 실패' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ errMsg: '답안 제출 실패' });
    }
  };
}

module.exports = XnotesController;
