const { Xnotes } = require('../models');
const { Op } = require('sequelize');

class XnotesRepository {
  submitAnswer = async (reXnoteData) => {
    try {
      const { user_id, exam_id, question_id, answer, marking } = reXnoteData;

      return await Xnotes.create({
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

      return await Xnotes.update(
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

      return await Xnotes.findOne({
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
      return await Xnotes.findAll({
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
