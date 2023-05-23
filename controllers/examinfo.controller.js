const ExaminfoService = require('../services/examinfo.service.js');

class ExaminfoController {
  examinfoService = new ExaminfoService();

  addMajor = async (req, res) => {
    try {
        // const { user_id } = res.locals.user;
        const { name } = req.body;

              
        await this.examinfoService.addMajor(name);
        return res.status(200).json({ msg: '전공 추가 완료' });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '전공 추가 실패'})
    }
  };

  getMajors = async (req, res) => {
    try {
        // const { user_id } = res.locals.user;
      

        const majorData = await this.examinfoService.getMajors();
        return res.status(200).json({ majorData });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '전공 보기 실패'})
    }
  };

  // updateMajor

  // dropMajor

};

module.exports = ExaminfoController;