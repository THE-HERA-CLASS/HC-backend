const LoginService = require('../services/login.service.js');
const jwt = require('../utils/jwt.js');
const redis = require('redis');

const resUtil = require('../utils/response.util.js');

class LoginController {
  loginService = new LoginService();

  logintst = async (req, res, next) => {
    try {
      res.locals.user;
      res.status(200).send(res.locals.user);
    } catch (err) {
      console.error(err);
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(411).json({ errMsg: '이메일 혹인 비밀번호를 확인해 주세요' });
    }
    const user = await this.loginService.findUserWithEmail(email);
    if (!user || user.password !== password) {
      return res.status(412).json({ errMsg: '등록되지 않은 사용자입니다.' });
    }

    const accessToken = await this.loginService.login(user);

    res.cookie('accesstoken', `Bearer ${accessToken}`);

    return res.status(200).json({
      authorization: accessToken,
    });
  };

  logout = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const result = await this.loginService.logout(user_id);

      if (result === 1) {
        res.clearCookie('accesstoken');
        return res.status(200).json({ message: '로그아웃이 성공적으로 처리되었습니다.' });
      } else {
        return res.status(419).json({ message: '로그아웃을 실패했습니다.' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '로그아웃을 처리할 수 없습니다.' });
    }
  };
}

module.exports = LoginController;
