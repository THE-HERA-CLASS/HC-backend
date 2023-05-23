const { Majors, Certificates, Subjects } = require('../models');

class ExaminfoRepository {
    
addMajor = async (name) => {
    try {
      return await Majors.create({
        name
      });
    } catch (err) {
      console.error(err);
    }
}
};

module.exports = ExaminfoRepository;