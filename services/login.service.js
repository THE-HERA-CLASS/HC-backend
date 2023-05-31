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
    return await this.userRepository.emailExists(email);
  };

  login = async (user) => {
    try {
      const accessToken = jwt.createAccessToken(
        user.user_id,
        user.nickname,
        user.email,
        user.major_id,
        user.authority,
        user.image
      );

      const refreshToken = jwt.createRefreshToken(user.user_id);

      const key = `refreshtoken:${user.user_id}`;
      const value = refreshToken;
      const expire_time = 86400;

      await this.redisRepository.setData(key, value, expire_time);

      return accessToken;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  logout = async (user_id) => {
    try {
      const key = `refreshtoken:${user_id}`;
      return await this.redisRepository.deleteData(key);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  redis_save_email_auth_number = async (email, userNum, EXPIRE_TIME) => {
    try {
      return await this.redisRepository.setData(email, userNum, EXPIRE_TIME);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  redis_find_email_auth_number = async (email) => {
    try {
      return await this.redisRepository.getData(email);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

module.exports = LoginService;
