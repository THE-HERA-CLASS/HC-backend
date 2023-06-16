const { Op } = require('sequelize');

class XnotesRepository {
  constructor(XnotesModel) {
    this.xnotesModel = XnotesModel;
  }
  submitAnswer = async (reXnoteData) => {
    try {
      const { user_id, exam_id, question_id, answer, marking } = reXnoteData;

      return await this.xnotesModel.create({
        user_id,
        exam_id,
        question_id,
        answer,
        marking,
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateUserAnswer = async (reXnoteData) => {
    try {
      const { user_id, exam_id, question_id, answer, marking } = reXnoteData;

      return await this.xnotesModel.update(
        {
          answer,
          marking,
        },
        {
          where: {
            [Op.and]: [{ user_id: user_id }, { exam_id: exam_id }, { question_id: question_id }],
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  userAnswerExists = async (reXnoteData) => {
    try {
      const { user_id, question_id } = reXnoteData;

      return await this.xnotesModel.findOne({
        where: {
          [Op.and]: [{ user_id: user_id }, { question_id: question_id }],
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  getAnswerWithExamId = async (user_id, exam_id) => {
    try {
      return await this.xnotesModel.findAll({
        where: {
          [Op.and]: [{ user_id: user_id }, { exam_id: exam_id }],
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = XnotesRepository;
