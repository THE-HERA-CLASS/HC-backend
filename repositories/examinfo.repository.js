const { Op } = require('sequelize');

class ExaminfoRepository {
  constructor(MajorsModel, CertificatesModel, SubjectsModel, ExamsModel) {
    this.majorsModel = MajorsModel;
    this.certificatesModel = CertificatesModel;
    this.subjectsModel = SubjectsModel;
    this.examsModel = ExamsModel;
  }

  // ==================================== 전공 ====================================

  addMajor = async (name) => {
    try {
      return await this.majorsModel.create({
        name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getMajors = async () => {
    try {
      return await this.majorsModel.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getOneMajor = async (major_id) => {
    try {
      return await this.majorsModel.findOne({ where: { major_id } });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  updateMajor = async (major_id, name) => {
    try {
      return await this.majorsModel.update({ name }, { where: { major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropMajor = async (major_id) => {
    try {
      return await this.majorsModel.destroy({ where: { major_id: major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 자격증 ====================================

  addCertificate = async (major_id, name, division) => {
    try {
      return await this.certificatesModel.create({
        major_id,
        name,
        division,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getCertificate = async () => {
    try {
      return await this.certificatesModel.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getCertificateWithMajorId = async (major_id) => {
    try {
      return await this.certificatesModel.findAll({ where: { major_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getCertificateWithCertificateId = async (certificate_id) => {
    try {
      return await this.certificatesModel.findOne({ where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateCertificate = async (certificate_id, major_id, name, division) => {
    try {
      return await this.certificatesModel.update({ major_id, name, division }, { where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropCertificate = async (certificate_id) => {
    try {
      return await this.certificatesModel.destroy({ where: { certificate_id: certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 과목 ====================================

  addSubject = async (certificate_id, name) => {
    try {
      return await this.subjectsModel.create({
        certificate_id,
        name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getSubject = async () => {
    try {
      return await this.subjectsModel.findAll({});
    } catch (err) {
      console.err(err);
    }
  };

  getSubjectWithCertificateId = async (certificate_id) => {
    try {
      return await this.subjectsModel.findAll({ where: { certificate_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getSubjectWithSubjectId = async (subject_id) => {
    try {
      return await this.subjectsModel.findOne({ where: { subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  updateSubject = async (subject_id, certificate_id, name) => {
    try {
      return await this.subjectsModel.update({ certificate_id, name }, { where: { subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  dropSubject = async (subject_id) => {
    try {
      return await this.subjectsModel.destroy({ where: { subject_id: subject_id } });
    } catch (err) {
      console.error(err);
    }
  };

  // ==================================== 시험지 ====================================

  addExam = async (major_id, certificate_id, subject_id, year, round) => {
    try {
      const getMajorData = await this.majorsModel.findOne({ where: { major_id } });
      const major_name = getMajorData.name;
      const getCertificateData = await this.certificatesModel.findOne({ where: { certificate_id } });
      const certificate_name = getCertificateData.name;
      const certificate_division = getCertificateData.division;
      const getSubjectData = await this.subjectsModel.findOne({ where: { subject_id } });
      const subject_name = getSubjectData.name;

      return await this.majorsModel.create({
        major_id,
        major_name,
        certificate_id,
        certificate_name,
        certificate_division,
        subject_id,
        subject_name,
        year,
        round,
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExam = async () => {
    try {
      return await this.majorsModel.findAll({
        order: [
          ['major_id', 'ASC'],
          ['certificate_id', 'ASC'],
          ['subject_id', 'ASC'],
          ['year', 'ASC'],
          ['round', 'ASC'],
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExamId = async (examData) => {
    try {
      return await this.majorsModel.findOne({
        where: {
          [Op.and]: [
            { major_id: examData.major_id },
            { certificate_id: examData.certificate_id },
            { subject_id: examData.subject_id },
            { year: examData.year },
            { round: examData.round },
          ],
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExamWithExamId = async (exam_id) => {
    try {
      return await this.majorsModel.findAll({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getExamWithSubjectId = async (subject_id) => {
    try {
      return await this.majorsModel.findAll({
        order: [
          ['major_id', 'ASC'],
          ['certificate_id', 'ASC'],
          ['subject_id', 'ASC'],
          ['year', 'ASC'],
          ['round', 'ASC'],
        ],
        where: { subject_id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  getExamWithCertificateId = async (certificate_id) => {
    try {
      return await this.majorsModel.findAll({
        order: [
          ['major_id', 'ASC'],
          ['certificate_id', 'ASC'],
          ['subject_id', 'ASC'],
          ['year', 'ASC'],
          ['round', 'ASC'],
        ],
        where: { certificate_id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateExam = async (examData) => {
    try {
      const { exam_id, major_id, certificate_id, subject_id, year, round } = examData;
      let major_name, certificate_name, certificate_division, subject_name;

      if (major_id) {
        const getMajorData = await this.majorsModel.findOne({ where: { major_id } });
        major_name = getMajorData.name;
      }

      if (certificate_id) {
        const getCertificateData = await this.certificatesModel.findOne({ where: { certificate_id } });
        certificate_name = getCertificateData.name;
        certificate_division = getCertificateData.division;
      }

      if (subject_id) {
        const getSubjectData = await this.subjectsModel.findOne({ where: { subject_id } });
        subject_name = getSubjectData.name;
      }

      await this.majorsModel.update(
        {
          major_id,
          major_name,
          certificate_id,
          certificate_name,
          certificate_division,
          subject_id,
          subject_name,
          year,
          round,
        },
        { where: { exam_id } }
      );

      return await this.majorsModel.findAll({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };

  deleteExam = async (exam_id) => {
    try {
      return await this.majorsModel.destroy({ where: { exam_id } });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = ExaminfoRepository;
