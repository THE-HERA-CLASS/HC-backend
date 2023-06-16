const XnotesRepository = require('../repositories/xnote.repository.js');
const QuestionsRepository = require('../repositories/question.repository.js');

class XnotesService {
  xnotesRepository = new XnotesRepository();
  questionsRepository = new QuestionsRepository();

  submitAnswer = async (user_id, exam_id, data) => {
    let returnCount = 0;
    try {
      for (const row of data) {
        const question_id = row.question_id;
        const answer = row.answer;

        const getQuestionData = await this.questionsRepository.getQuestionWithQuestionId(question_id);
        const answer_origin = getQuestionData.answer;
        const marking = answer_origin === answer ? 1 : 0; // 맞으면 1, 틀리면 0
        const reXnoteData = {
          user_id,
          exam_id,
          question_id,
          answer,
          marking,
        };
        const userAnswerExists = await this.xnotesRepository.userAnswerExists(reXnoteData);
        if (!userAnswerExists) {
          await this.xnotesRepository.submitAnswer(reXnoteData);
        } else {
          await this.xnotesRepository.updateUserAnswer(reXnoteData);
        }
        returnCount++;
      }
      console.log(`returnCount: ${returnCount}`);
      return returnCount;
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = XnotesService;
