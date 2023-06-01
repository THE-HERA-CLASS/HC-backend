const { Users } = require('../models');
const jwt = require('../utils/jwt.js');
const RedisRepository = require('../repositories/redis.repository.js');
const redis = require('redis');
const redisRepository = new RedisRepository(redis);
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const accesstoken = req.cookies.accesstoken;

    if (!accesstoken) {
      return res.status(411).json({ errMsg: '엑세스 토큰 없음, 재로그인 필요' });
    }

    const [accTokenType, accTokenValue] = accesstoken.split(' ');

    if (accTokenType !== 'Bearer') {
      return res.status(412).json({ errMsg: '엑세스 토큰 타입 불량, 재로그인 필요.' });
    }
    if (!accTokenValue) {
      return res.status(412).json({ errMsg: '엑세스 토큰 값 불량, 재로그인 필요.' });
    }

    const decodeToken = jwt.validateTokenValue(accTokenValue);
    const email = decodeToken.email;
    const getUserData = await Users.findOne({ where: { email } });

    if (!getUserData) {
      return res.status(401).json({ errMsg: '로그인된 사용자 정보가 유효하지 않습니다.' });
    }

    const setUserData = {
      user_id: getUserData.user_id,
      nickname: getUserData.nickname,
      authority: getUserData.authority,
      email: getUserData.email,
      image: getUserData.image,
      major_id: getUserData.major_id,
    };

    res.locals.user = setUserData;

    // Redis에서 refreshToken을 가져와서 accessToken 재발급
    // accessToken의 유효시간이 만료되면 다시 토큰 생성
    // 브라우저는 만료되어도 토큰을 가지고있다
    const refreshTokenKey = `refreshtoken:${user.user_id}`;
    const refreshToken = await redisRepository.getData(refreshTokenKey);
    // const refreshTokenKey = `refreshtoken:${getUserData.user_id}`;
    // const refreshToken = await redisRepository.getData(refreshTokenKey);

    // if (refreshToken) {
    //   const newAccessToken = jwt.createAccessToken(
    //     getUserData.user_id,
    //     getUserData.nickname,
    //     getUserData.email,
    //     getUserData.major_id,
    //     getUserData.authority,
    //     getUserData.image
    //   );

    //   res.cookie('accesstoken', `Bearer ${newAccessToken}`);
    // } else {
    //   return res.status(411).json({ errMsg: 'Redis RefreshToken Undefined' });
    // }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
