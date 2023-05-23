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

  getMajors = async () => {
    try {
      const majorData = await this.examinfoRepository.getMajors();
    //   const majorPrint = majorData.map((item) => {
    //     return { 
    //         id: item.major_id,
    //         name: item.name,
    //     }
    //   })
    //   const majorOne = {
    //     id: majorData.major_id,
    //     name: majorData.name,
    //   } 
      return majorData;
    } catch (err) {
        console.err(err);
    }
  }
  
  updateMajor = async (name, major_id) => {
    try {
      return await this.examinfoRepository.updateMajor(name, major_id);
    } catch (err) {
      console.error(err);
    }
  }

  dropMajor = async (major_id) => {
    try {
      return await this.examinfoRepository.dropMajor(major_id);
    } catch (err) {
      console.error(err);
    }
  }

  };




module.exports = ExaminfoService;