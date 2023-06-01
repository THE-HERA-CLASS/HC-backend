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

    // accessToken 유효기간 만료시 refreshToken 재발급
    let decodeToken;
    try {
      // accesstoken의 payload를 복호화, 클라이언트의 정보가 담겨있음(user_id...등)
      decodeToken = jwt.validateTokenValue(accTokenValue);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshTokenKey = `refreshtoken:${decodeToken.user_id}`; //decodeToken의 user_id: 현재로그인유저의 user_id
        // refreshTokenKey으로 해당 refreshToken을 가져온다
        const refreshToken = await redisRepository.getData(refreshTokenKey);
        
        //refreshToken이 없다면?
        if (!refreshToken) {
          console.log(refreshToken);
          return res.status(411).json({ errMsg: 'Redis에 refreshtoken이 유효하지 않습니다.' });
        }
    
        try {
          // refreshToken 복호화
          const decodedRefreshToken = jwt.validateTokenValue(refreshToken);
          // jwt.js 에서 createRefreshToken에 로그인사용자의 user_id를 포함시키도록 수정
          // 따라서 해당 refreshToken 보유 유저의 정보를 알수 있음
          const userData = await Users.findOne({ where: { user_id: decodedRefreshToken.user_id } });
          // refreshToken에 저장된 user_id로 해당 유저의 레코드 데이터로 accessToken 재발급
          const newAccessToken = jwt.createAccessToken(
            userData.user_id,
            userData.nickname,
            userData.email,
            userData.major_id,
            userData.authority,
            userData.image
          );
          
          res.cookie('accesstoken', `Bearer ${newAccessToken}`);
          // 재발급 accessToken 유효성검증
          decodeToken = jwt.validateTokenValue(newAccessToken);
        } catch (err) {
          return res.status(400).json({ errMsg: '로그인된 사용자 정보가 유효하지 않습니다.' });
        }
      }
    }
        // 유저의 refreshtoken이 존재하는지
        const refreshTokenKey = `refreshtoken:${userData.user_id}`;
        const refreshToken = await redisRepository.getData(refreshTokenKey);
        if (!refreshToken) {
          return res.status(411).json({ errMsg: 'redis에 해당 사용자의 refreshtoken이 존재하지 않습니다' });
        }

    // 재발급된 accessToken로 유저데이터 생성
    const email = decodeToken.email;
    const userData = await Users.findOne({ where: { email } });

    if (!userData) {
      return res.status(411).json({ errMsg: '사용자의 데이터가 존재하지 않습니다.' });
    }

    const newUserData = {
      user_id: userData.user_id,
      nickname: userData.nickname,
      authority: userData.authority,
      email: userData.email,
      image: userData.image,
      major_id: userData.major_id,
    };

    res.locals.user = newUserData;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
