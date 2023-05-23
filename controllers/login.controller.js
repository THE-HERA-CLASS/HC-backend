const LoginService = require('../services/login.service.js');
// const RedisClientRepository = require('../repositories/redis.repository.js');
// const redisClient = new RedisClientRepository(redis);
const resUtil = require('../utils/response.util.js');

class LoginController {
  loginService = new LoginService();

  login = async (req, res) => {
    const { email, password } = req.body;
    // email 유효성
    // if (!email|| !email.includes('@'))
    if (!email || !password) {
      return res
        .status(412)
        .json({ errMsg: '이메일 혹인 비밀번호를 확인해 주세요' });
    }
    const user = await this.loginService.findUserWithEmail(email);
    if (!user || user.password !== password) {
      return res.status(411).json({ errMsg: '등록되지 않은 사용자입니다.' });
    }

    const [accessToken, refreshToken] = await this.loginService.login(user);

    const userData = {
      user_id: user.user_id,
      nickname: user.nickname,
      authority: user.authority,
      email: user.email,
      image: user.image,
      major_id: user.major_id,
    };
    res.cookie('accessToken', `${accessToken}`);
    res.cookie('refreshToken', `${refreshToken}`);
   return res.status(200).json({ accessToken, refreshToken, userData});

  };
}

module.exports = LoginController;

// return res.status(411).json({ errMsg: '값 없음 : nickname' });
// return res.status(412).json({ errMsg: '형식 에러 : email @ 없음' });
// return res.status(200).json({ msg: '회원가입 완료' });
// return res.status(419).json({ errMsg: '회원가입 실패' });
// res.status(400).json({ errMsg: '전체 에러' });

// 그리고 status code는
// 전체에러 : 400
// 값 없는 예외처리 : 411
// 데이터 형식 예외처리 : 412
// 비즈니스로직 실패 : 419
// 감사합니답~!
