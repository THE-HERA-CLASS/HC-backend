const { Users } = require('../models');
const redis = require('redis');
const RedisClientRepository = require('../repositories/redis.repository.js');
const jwt = require('../utils/jwt.js');

const redisClientRepository = new RedisClientRepository(redis);

// 사용자 인증 미들웨어 - Redis 방식
// HTTP 요청으로부터 accessToken 과 refreshToken을 얻는 과정
module.exports = async (req, res, next) => {
  try {
    // const { accessToken } = req.headers
    let accessToken;
    let refreshToken;
    // 만약 req.cookies에 accessToken과 refreshToken이 존재한다면 각각의 토큰을 변수에 할당
    if (req.cookies.accessToken) { //refreshToken으로 변경 기간을 5s로 설정하고 테스트 -> accToken
      accessToken = req.cookies.accessToken;
      refreshToken = req.cookies.refreshToken;
      // 만약 req.cookies에 토큰이 없고, req.headers에 accessToken과 refreshToken이 존재한다면 각각의 토큰을 변수에 할당
    } else if (req.headers.accessToken) {
      accessToken = req.headers.accessToken;
      refreshToken = req.headers.refreshToken;
      // 모든 요청( 쿠키, 헤더 )에 토큰이 없다면  accessToken과 refreshToken의 변수를 null로 지정
    } else {
      accessToken = null;
      refreshToken = null;
    }
    // 토큰의 존재여부를 확인한다
    const isAccessToken = accessToken ? true : false;
    const isRefreshToken = refreshToken ? true : false;
    // 위에서 가져온 accessToken과 refreshToken 둘 중 하나의 토큰이라도 존재하지않으면(false) 에러 발생
    // 클라이언트가 로그인한 상태인지 확인 하는 역활
    if (!isAccessToken || !isRefreshToken) {
      return res
        .status(401)
        .json({ errorMessage: '쿠키에 모든 토큰 없음, 로그인 필요' });
    }

    // 쿠키에 저장된 accessToken과 refreshToken 토큰을 공백의 기준으로 분활하여 토큰의 타입과 값으로 나눈다
    // 일반적으로 토큰은 'Bearer [토큰 값]' 형식으로 구성되어 있다. 즉, accessTokenType에 'Bearer'를, accessTokenValue에는 실제 토큰 값이 할당 된다.
    let [accessTokenType, accessTokenValue] = accessToken.split(' ');
    const [refreshTokenType, refreshTokenValue] = refreshToken.split(' ');

    // 분활한 토큰의 타입을 유효한지 검증
    // jwt.js에서 생성된 토큰의 타입이 'Bearer'인지 검증
    const isAccessTokenType = jwt.validateTokenType(accessTokenType);
    const isRefreshTokenType = jwt.validateTokenType(refreshTokenType);

    if (!isAccessTokenType) {
      return res
        .status(402)
        .json({ errorMessage: '엑세스 토큰 타입 불량, 로그인 필요' });
    }

    if (!isRefreshTokenType) {
      return res
        .status(402)
        .json({ errorMessage: '리프레시 토큰 타입 불량, 로그인 필요' });
    }

    // 토큰 값 JWT 검증 : (falsy) 토큰이 만료되었습니다.
    const isRefreshTokenValue = jwt.validateTokenValue(refreshTokenValue);
    const isAccessTokenValue = jwt.validateTokenValue(accessTokenValue);

    let redis_user_id;

    // 리프레시토큰 만료시
    if (isRefreshTokenValue) {
      // redis에 cookie.refreshToken와 동일한게 있는지 확인
      redis_user_id = await redisClientRepository.getData(refreshTokenValue);
      if (!redis_user_id) {
        return res.status(403).send('서버에 리프레시 토큰 없음, 재로그인 필요');
      }
    }

    // Users DB에서 redis_user_id와 같은 회원데이터를 가져와 변수에 할당
    const userData = await Users.findOne({
      attributes: ['user_id', 'nickname', 'email', 'major_id'],
      where: { user_id: redis_user_id },
    });

    // accessToken 만료시 재발급
    if (!isAccessTokenValue) {
      // Access Token 새발급
      const newAccessTokenValue = jwt.createAccessToken(
        // jwt.js에서 선언된 jwt생성 함수
        // 사용자의 데이터를 인자로 받아 jwt생성
        userData.dataValues.user_id,
        userData.dataValues.nickname,
        userData.dataValues.email,
        userData.dataValues.major_id
      );
      accessTokenValue = null; // accessToken을 초기화한다, 새로운 토큰으로 대체하기 위해
      accessTokenValue = newAccessTokenValue; // null로 비워진 accessToken을 새로 발급한 accessToken으로 대체
      // 새로 발급된 accessToken을 HTTP req.cookies에 accessToken이라는 이름으로 저장한다. 'Bearer'라는 문자열이 앞에 붙는 이유는 토큰 타입을 명시하기 위해
      res.cookie('accessToken', `Bearer ${accessTokenValue}`);
      // 이미 가지고 있던 리프레시 토큰 refreshTokenValue를 HTTP req.cookies에 'refreshToken'이라는 이름으로 저장한다.
      // refreshToken accessToken이 만료될 경우 새로운 액세스 토큰을 발급받는 데 사용된다.
    }
    // 위에서 선언된 변수 userData를 res.locals.user에 할당
    // userData는 클라이언트의 user_id, nickname, email, major_id 데이터를 가지고 있다
    res.locals.user = userData;
    next(); // 다음 미들웨어 실행
  } catch (err) {
    console.error(err);
    return res
      .status(401)
      .json({ errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.' });
  }
};
