const resUtil = require('../utils/response.util.js');

class ImageController {
    upload_image = async (req, res, next) => {
    const imageUrl = req.img_url; // 이미지 URL 가져오기
    if (imageUrl) {
      // 이미지 URL이 존재하면
      return res.status(200).json({ Data: imageUrl }); // 이미지 URL 반환해보리기~
    } else {
      // 이미지 URL이 없으면
      return res.status(400).send('이미지 업로드 실패');
    }
  };
}

module.exports = ImageController;
