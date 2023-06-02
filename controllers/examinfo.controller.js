const ExaminfoService = require('../services/examinfo.service.js');

class ExaminfoController {
  examinfoService = new ExaminfoService();

  //[전공]=================================================================

  addMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { name } = req.body;

      await this.examinfoService.addMajor(name);
      return res.status(200).json({ msg: '전공 추가 완료' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전공 추가 실패' });
    }
  };

  getMajors = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const majorData = await this.examinfoService.getMajors();
      return res.status(200).json({ data: majorData });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전공 조회 실패' });
    }
  };

  updateMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id } = req.params;
      const { name } = req.body;

      const updateResult = await this.examinfoService.updateMajor(name, major_id);

      if (updateResult) {
        return res.status(200).json({ msg: '전공 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '전공 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전공 수정 실패' });
    }
  };

  dropMajor = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id } = req.params;

      const dropResult = await this.examinfoService.dropMajor(major_id);

      if (dropResult) {
        return res.status(200).json({ msg: '전공 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '전공 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '전공 삭제 실패' });
    }
  };

  //[자격증]=================================================================

  addCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { major_id, name, division } = req.body;

      await this.examinfoService.addCertificate(major_id, name, division);
      return res.status(200).json({ msg: '자격증 추가 완료' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '자격증 추가 실패' });
    }
  };

  getCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const certificatesData = await this.examinfoService.getCertificate();
      return res.status(200).json({ data: certificatesData });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '자격증 조회 실패' });
    }
  };

  getCertificateWithMajorId = async (req, res) => {
    try {
      const { major_id } = req.params;
      const getCertificatesData = await this.examinfoService.getCertificateWithMajorId(major_id);
      if (getCertificatesData.length === 0) {
        return res.status(419).json({ errMsg: '요청 전공 해당 자격증 없음' });
      } else {
        return res.status(200).json({ data: getCertificatesData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '자격증 조회 실패' });
    }
  };

  updateCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id } = req.params;
      const { name, division } = req.body;

      const updateResult = await this.examinfoService.updateCertificate(certificate_id, name, division);

      if (updateResult) {
        return res.status(200).json({ msg: '자격증 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '자격증 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '자격증 수정 실패' });
    }
  };

  dropCertificate = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id } = req.params;

      const dropResult = await this.examinfoService.dropCertificate(certificate_id);

      if (dropResult) {
        return res.status(200).json({ msg: '자격증 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '자격증 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '자격증 삭제 실패' });
    }
  };

  //[과목]=================================================================

  addSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { certificate_id, name } = req.body;

      await this.examinfoService.addSubject(certificate_id, name);
      return res.status(200).json({ msg: '과목 추가 완료' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '과목 추가 실패' });
    }
  };

  getSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;

      const subjectData = await this.examinfoService.getSubject();
      return res.status(200).json({ data: subjectData });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '과목 조회 실패' });
    }
  };

  getSubjectWithCertificateId = async (req, res) => {
    try {
      const { certificate_id } = req.params;
      const getSubjectsData = await this.examinfoService.getSubjectWithCertificateId(certificate_id);
      if (getSubjectsData.length === 0) {
        return res.status(419).json({ errMsg: '요청 자격증 해당 과목 없음' });
      } else {
        return res.status(200).json({ data: getSubjectsData });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '과목 조회 실패' });
    }
  };

  updateSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { subject_id } = req.params;
      const { name } = req.body;

      const updateResult = await this.examinfoService.updateSubject(subject_id, name);

      if (updateResult) {
        return res.status(200).json({ msg: '과목 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '과목 수정 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '과목 수정 실패' });
    }
  };

  dropSubject = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;
      const { subject_id } = req.params;

      const dropResult = await this.examinfoService.dropSubject(subject_id);

      if (dropResult) {
        return res.status(200).json({ msg: '과목 삭제 완료' });
      } else {
        return res.status(419).json({ errMsg: '과목 삭제 실패' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '과목 삭제 실패' });
    }
  };
}

module.exports = ExaminfoController;
