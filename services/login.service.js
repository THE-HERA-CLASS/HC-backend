const redis = require('redis');
const jwt = require('../utils/jwt.js');
const { Users } = require('../models');
const UserRepository = require('../repositories/user.repository');
const RedisRepository = require('../repositories/redis.repository.js');
require('dotenv').config();

class LoginService {
  userRepository = new UserRepository(Users);
  redisRepository = new RedisRepository(redis);

  findUserWithEmail = async (email) => {
    const findUserWithEmailData = await this.userRepository.findUserWithEmail(email);
    console.log(findUserWithEmailData);
    return findUserWithEmailData;
  };

  // 로그인
  login = async (user) => {
    try {
      // 사용자의 데이터를 담은 accessToken를 생성
      const accessToken = jwt.createAccessToken(
        user.user_id,
        user.nickname,
        user.email,
        user.major_id,
        user.authority,
        user.image
      );
      // refreshToken을 생성한다
      const refreshToken = jwt.createRefreshToken(user.user_id);
      // key: accessToken, value: user_id로 redis에 저장
      const key = `refreshToken:${user.user_id}`; // refreshToken만 redis에 저장 refresh토큰이다 라는 것을 명시 이유?: redis에 refreshToken만 user_id를 key값으로 넣을 경우가 생길 상황이 생길 수 도있어서.
      console.log('키값은:', key);
      const value = refreshToken;
      await this.redisRepository.setData(key, value, process.env.REFRESH_TOKEN_EXPIRE_TIME);

      // login 메서드에서 생성된 accessToken, refreshToken 반환
      return [accessToken, refreshToken];
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // 로그아웃
  // 만약 refreshToken을 redis에서 삭제해도 accessToken의 유효시간이 많이 남으면 보안상 문제가 되지안는가?
  // 1. accessToken의 유효기간을 짧게
  // 2. token revocation(토큰 폐기) 기능 구현 : 구현이 복잡하고 기능 성능 이슈를 초래할 수 있다
  // best : 클라이언트 측에서 로그아웃시 cookies를 삭제
  // local.user에 저장된 정보도 삭제 (middleware)
  logout = async (user) => {
    try {
      const key = `refreshToken:${user.user_id}`;
      const result = await this.redisRepository.deleteData(key);
      return result;
    } catch (err) {
      console.error(err);
      throw err; // 예외를 다시 던져서 호출하는 쪽에서 처리하도록 함
    }
  };
}

module.exports = LoginService;
