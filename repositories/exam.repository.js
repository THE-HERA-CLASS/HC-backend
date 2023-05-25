const { Questions } = require('../models');

class ExamRepository {
  addQuestions = async (questionDatas) => {
    try {
      return await Questions.create({
        sort_num: questionDatas.sort_num,
        question_num: questionDatas.question_num,
        question: questionDatas.question,
        example: questionDatas.example,
        choice: questionDatas.choice,
        answer: questionDatas.answer,
        solve: questionDatas.solve,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ExamRepository;
