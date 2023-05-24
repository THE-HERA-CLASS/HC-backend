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

//[자격증]=================================================================

  addCertificate = async (req, res) => {
    try {
        // const { user_id } = res.locals.user;
        const { major_id, name, division } = req.body;

              
        await this.examinfoService.addCertificate(major_id, name, division);
        return res.status(200).json({ msg: '자격증 추가 완료' });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '자격증 추가 실패'})
    }
  };

  getCertificate = async (req, res) => {
    try {
        // const { user_id } = res.locals.user;
      

        const certificateData = await this.examinfoService.getCertificate();
        return res.status(200).json({ certificateData });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '자격증 보기 실패'})
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
          return res.status(419).json({ errMsg: '자격증 수정 실패'});
        }

    } catch (error) {
        console.error(error);
        return res.status(400).json({ errMsg: '자격증 수정 실패'})
    }
  };

//   dropCertificate = async (req, res) => {
//     try {
//         // const { user_id } = res.locals.user;
//         const { major_id } = req.params;
              
//         const dropResult = await this.examinfoService.dropCertificate(major_id);
        
//         if (dropResult) {
//           return res.status(200).json({ msg: '전공 삭제 완료' });
//         } else {
//           return res.status(419).json({ errMsg: '전공 삭제 실패'});
//         }        
//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ errMsg: '전공 삭제 실패'})
//     }    
//   }; 

// //[과목]=================================================================

// addSubject = async (req, res) => {
//   try {
//       // const { user_id } = res.locals.user;
//       const { name } = req.body;

            
//       await this.examinfoService.addSubject(name);
//       return res.status(200).json({ msg: '전공 추가 완료' });

//   } catch (error) {
//       console.error(error);
//       return res.status(400).json({ errMsg: '전공 추가 실패'})
//   }
// };

// getSubject = async (req, res) => {
//   try {
//       // const { user_id } = res.locals.user;
    

//       const majorData = await this.examinfoService.getSubject();
//       return res.status(200).json({ majorData });

//   } catch (error) {
//       console.error(error);
//       return res.status(400).json({ errMsg: '전공 보기 실패'})
//   }
// };

// updateSubject = async (req, res) => {
//   try {
//       // const { user_id } = res.locals.user;
//       const { major_id } = req.params;
//       const { name } = req.body;
            
//       const updateResult = await this.examinfoService.updateSubject(name, major_id);
      
//       if (updateResult) {
//         return res.status(200).json({ msg: '전공 수정 완료' });
//       } else {
//         return res.status(419).json({ errMsg: '전공 수정 실패'});
//       }

//   } catch (error) {
//       console.error(error);
//       return res.status(400).json({ errMsg: '전공 수정 실패'})
//   }
// };

// dropSubject = async (req, res) => {
//   try {
//       // const { user_id } = res.locals.user;
//       const { major_id } = req.params;
            
//       const dropResult = await this.examinfoService.dropSubject(major_id);
      
//       if (dropResult) {
//         return res.status(200).json({ msg: '전공 삭제 완료' });
//       } else {
//         return res.status(419).json({ errMsg: '전공 삭제 실패'});
//       }        
//   } catch (error) {
//       console.error(error);
//       return res.status(400).json({ errMsg: '전공 삭제 실패'})
//   }    
// };
  
};

module.exports = ExaminfoController;