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

getMajors = async () => {
    try {
      return await Majors.findAll({ });      
    } catch (err) {
        console.err(err);
    }
  }
  

};

module.exports = ExaminfoRepository;