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

updateMajor = async (name, major_id) => {
    try {
      return await Majors.update(
        { name : name },
        { where: { major_id: major_id } } 
      );
    } catch (err) {
      console.error(err);
    }
}

dropMajor = async (major_id) => {
    try {
      return await Majors.destroy(
        { where: { major_id: major_id } } 
      );
    } catch (err) {
      console.error(err);
    }
}

};

module.exports = ExaminfoRepository;
