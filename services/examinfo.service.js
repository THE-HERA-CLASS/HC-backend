const ExaminfoRepository = require('../repositories/examinfo.repository.js');

class ExaminfoService {
  examinfoRepository = new ExaminfoRepository();

  addMajor = async (name) => {
    try {
      return await this.examinfoRepository.addMajor(name);
    } catch (err) {
      console.error(err);
    }
}
  };




module.exports = ExaminfoService;