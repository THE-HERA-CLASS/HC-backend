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

  updateMajor = async (req, res) => {
    try {
        // const { user_id } = res.locals.user;
        const { major_id } = req.params;
        const { name } = req.body;
              
        const updateResult = await this.examinfoService.updateMajor(name, major_id);
        
        if (updateResult) {
          return res.status(200).json({ msg: '전공 수정 완료' });
        } else {
          return res.status(419).json({ errMsg: '전공 수정 실패'});
        }

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '전공 수정 실패'})
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
          return res.status(419).json({ errMsg: '전공 삭제 실패'});
        }        
    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '전공 삭제 실패'})
    }    
  };
  
};

module.exports = ExaminfoController;
