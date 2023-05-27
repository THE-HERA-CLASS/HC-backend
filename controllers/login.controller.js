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
    res.cookie('accessToken', `${accessToken}`);
    return res
      .status(200)
      .json({ msg: '로그인 성공(refreshToken 확인용으로 표시 보안상 나중에 지우도록)', accessToken, refreshToken, userData });
  };

  로그아웃
  logout = async (req, res) => {
    // const { refreshToken } = req.headers;
    // const { refreshToken } = req.cookies;

    let accessToken;
    let refreshToken;
    // cookie와 header에서 accessToken과 refreshToken을 찾아 변수에 할당
    if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken;
      refreshToken = req.cookies.refreshToken;
    } else if (req.headers.accessToken) {
      accessToken = req.headers.accessToken;
      refreshToken = req.headers.refreshToken;
    } else {
      accessToken = null;
      refreshToken = null;
    }
    // refreshToken이 없거나 형식이 잘못된 경우 에러 처리
    if (!refreshToken || !refreshToken.includes(' ')) {
      return res
        .status(411)
        .json({ errMsg: 'Refresh token이 유효하지 않습니다.' });
    }
    // split함수로 refeshToken의 type과 value를 구분해서 변수에 저장
    const [tokenType, tokenValue] = refreshToken.split(' ');
    // res.clearCookie(); // 모든 쿠키삭제
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    //userService의 logout 메서드를 호출하여 Redis에서 tokenValue를 삭제하고 그 결과를 result에 저장한다.
    const result = await this.loginService.logout(tokenValue);
    if (result) {
      return res.status(200).json({ msg: '로그아웃 되었습니다.' });
    } else {
      return res.status(400).json({ errMsg: '로그아웃 실패.' });
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
