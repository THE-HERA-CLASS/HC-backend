const LoginService = require('../services/login.service.js');
const UserService = require('../services/user.service.js')
const jwt = require('../utils/jwt.js');
const redis = require('redis');
const RedisRepository = require('../repositories/redis.repository');

const resUtil = require('../utils/response.util.js');

class LoginController {
  loginService = new LoginService();
  userService = new UserService();
  redisRepository = new RedisRepository(redis);

  login = async (req, res) => {
    const { email, password } = req.body;
    // email 유효성
    // if (!email|| !email.includes('@'))
    if (!email || !password) {
      return res
        .status(412)
        .json({ errMsg: '이메일 혹인 비밀번호를 확인해 주세요' });
    }
    const user = await this.userService.emailExists(email);
    if (!user || user.password !== password) {
      return res.status(411).json({ errMsg: '등록되지 않은 사용자입니다.' });
    }

    const [accessToken, refreshToken] = await this.loginService.login(user);

    // 유저의 정보
    const userData = {
      user_id: user.user_id,
      nickname: user.nickname,
      authority: user.authority,
      email: user.email,
      image: user.image,
      major_id: user.major_id,
    };
    // cookie에 저장
    res.cookie('accessToken', `Bearer ${accessToken}`);
    return res
      .status(200)
      .json({ msg: '로그인 성공(refreshToken 확인용으로 표시 보안상 나중에 지우도록)', accessToken, refreshToken, userData });
  };
  
  logout = async (req, res) => {
    try {
      const user = res.locals.user; // 로그인한 사용자의 정보를 가져옴
  
      const key = `refreshToken:${user.user_id}`; // refreshToken을 삭제할 키 생성
      const result = await this.loginService.logout(user); // 로그아웃 서비스 호출
  
      if (result === 1) {
        // 로그아웃 성공
        res.clearCookie('accessToken'); // accessToken 쿠키 삭제
        return res.status(200).json({ message: '로그아웃이 성공적으로 처리되었습니다.' });
      } else {
        // 로그아웃 실패
        return res.status(400).json({ message: '로그아웃을 실패했습니다.' });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: '로그아웃을 처리할 수 없습니다.' });
    }
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
