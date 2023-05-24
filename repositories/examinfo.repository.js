const { Majors, Certificates, Subjects } = require('../models');

class ExaminfoRepository {

//[전공]=================================================================      
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

//[자격증]=================================================================
addCertificate = async (major_id, name, division) => {
  try {
    return await Certificates.create({
      major_id,
      name,
      division
    });
  } catch (err) {
    console.error(err);
  }
}

getCertificate = async () => {
  try {
    return await Certificates.findAll({ });      
  } catch (err) {
      console.err(err);
  }
}

updateCertificate = async (certificate_id, name, division, ) => {
  try {
    return await Certificates.update(
      { name : name, division : division },
      { where: { certificate_id: certificate_id } }
    );
  } catch (err) {
    console.error(err);
  }
}

// dropCertificate = async (major_id) => {
//   try {
//     return await Certificates.destroy(
//       { where: { major_id: major_id } } 
//     );
//   } catch (err) {
//     console.error(err);
//   }
// }


};

module.exports = ExaminfoRepository;