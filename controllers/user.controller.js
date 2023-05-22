const UserService = require('../services/user.service.js');

class UserController {
  userService = new UserService();

  emailExists = async (req, res) => {
    const email = req.params.email;

    // 예외처리
    if (!email) {
      res.status(412).json({ errorMessage: '이메일 값이 없음' });
    }

    const emailExistsData = await this.userService.emailExists(email);

    if (!emailExistsData) {
      return res.status(200).json({ message: '이메일 사용 가능' });
    } else {
      return res.status(204).json({ message: '이메일 사용 불가능' });
    }
  };
}

module.exports = UserController;
