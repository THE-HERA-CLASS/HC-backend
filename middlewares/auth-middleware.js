const { Users } = require('../models');
const jwt = require('../utils/jwt.js');
// const jwt = require('jsonwebtoken');
const RedisRepository = require('../repositories/redis.repository.js');
const redis = require('redis');
const redisRepository = new RedisRepository(redis);
require('dotenv').config();


// 사용자 인증 미들웨어 - Redis 방식
// HTTP 요청으로부터 accessToken과 refreshToken을 얻는 과정
module.exports = async (req, res, next) => {
  const { accessToken } = req.cookies;
  const [ accTokenType, accTokenValue ] = accessToken.split(' ');

  try {
    console.log("쿠키에 저장된 엑세스토큰:",accessToken);
    console.log("쿠키에 저장된 엑세스토큰Type:",accTokenType);
    console.log("쿠키에 저장된 엑세스토큰Value:",accTokenValue);

    if (accTokenType !== 'Bearer') {
      return res.status(402).json({ errMsg: '엑세스 토큰 타입 불량, 재로그인 필요.' });
    }
    if (!accTokenValue) {
      return res.status(403).json({ errMsg: '엑세스 토큰 값 불량, 재로그인 필요.' });
    }

    const decodeToken = jwt.decodeToken(accTokenValue, process.env.SECRET_KEY);
    console.log('디코드엑세스토큰:',decodeToken, '시크릿키:',process.env.SECRET_KEY);
    const email = decodeToken.email;
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      console.log("db에서 찾은 user정보:", user);
      return res.status(401).json({ errMsg: '로그인된 사용자 정보가 유효하지 않습니다.' });
    }

    const userData = {
      user_id: user.user_id,
      nickname: user.nickname,
      authority: user.authority,
      email: user.email,
      image: user.image,
      major_id: user.major_id,
    };

    res.locals.user = userData;

    // Redis에서 refreshToken을 가져와서 accessToken 재발급
    const refreshTokenKey = `refreshToken:${user.user_id}`;
    const refreshToken = await redisRepository.getData(refreshTokenKey);

    if (refreshToken) {
      const newAccessToken = jwt.createAccessToken(
        user.user_id,
        user.email,
        user.authority,
        user.image,
        user.major_id,
        user.nickname
      );
      res.cookie('accessToken', `Bearer ${newAccessToken}`);
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
