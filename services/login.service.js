const RedisClientRepository = require('../repositories/redis.repository.js');
const redis = require('redis');
const jwt = require('../utils/jwt.js');
const { Users } = require('../models');
const UserRepository = require('../repositories/user.repository');
require('dotenv').config();

class LoginService {
  userRepository = new UserRepository(Users);
  redisClientRepository = new RedisClientRepository(redis);

  findUserWithEmail = async (email) => {
    const findUserWithEmailData = await this.userRepository.findUserWithEmail(email);
    console.log(findUserWithEmailData);
    return findUserWithEmailData;
  };

  login = async (user) => {
    try {
      const accessToken = jwt.createAccessToken(
        user.user_id,
        user.email,
        user.authority,
        user.image,
        user.major_id,
        user.nickname
      );
      const refreshToken = jwt.createRefreshToken(user.user_id);
      // key: accessToken, value: user_id로 redis에 저장
      const key = accessToken;
      const value = user.user_id;
      const EXPIRE_TIME = 1209600;
      await this.redisClientRepository.setData(key, value, EXPIRE_TIME);

      // login 메서드에서 생성된 accessToken, refreshToken 반환
      return [accessToken, refreshToken];
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

module.exports = LoginService;
