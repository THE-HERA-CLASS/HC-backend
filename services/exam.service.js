const ExamRepository = require('../repositories/exam.repository.js');

class ExamService {
  examRepository = new ExamRepository();
}

module.exports = ExamService;
