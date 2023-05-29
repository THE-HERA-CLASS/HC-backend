const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY; // env에서 SECRET_KEY 불러오기
const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME; // env에서 accesstoken 소멸시간 로드
const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME; // env에서 refreshtoken 소멸시간 로드

module.exports = {
  // Access Token 발급
  createAccessToken: (user_id, nickname, email, major_id, authority, image) => {
    return jwt.sign(
      { user_id, nickname, email, major_id, authority, image }, //JWT 토큰의 payload에 해당한다. 토큰을 해석하면 이 정보들을 확인할 수 있다.
      SECRET_KEY,
      {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME, // 토큰 만료시간 설정
      }
    );
  },
  
  // Refresh Token 발급
  createRefreshToken: () => {
    return jwt.sign({}, SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME, //만료시간 설정
    });
  },

  // Token Type 검증 ( Bearer인지 확인함)
  validateTokenType: (tokenType) => {
    try {
      return tokenType === 'Bearer' ? true : false;
    } catch (error) {
      return false;
    }
  },

  // Token Value 검증 : verify는 검증실패 시, 에러를 발생시킴
  // 검증 성공시 토큰의 payload를 리턴한다
  validateTokenValue: (tokenValue) => {
    try {
      const result = jwt.verify(tokenValue, SECRET_KEY); // JWT를 검증합니다.
      return result;
    } catch (error) {
      return false;
    }
  },

  // Token에 암호화된 Payload 가져오기
  decodeToken: (tokenValue) => {
    try {
      // JWT에서 Payload를 가져옵니다.
      if (jwt.verify(tokenValue, SECRET_KEY)) {
        // JWT를 검증
        return jwt.decode(tokenValue); // 토큰에서 payload를 해독해서 반환
      }
    } catch (error) {
      return null;
    }
  },

  // 위의 코드 수정하기
  // 어차피 jwt.verify 함수는 유효한 토큰일 경우 해독된 payload 반환하기 때문에 별도의 jwt.decode함수를 호출할 필요가 없다
  //   getTokenPayload: (tokenValue) => {
  //     try {
  //       return jwt.verify(tokenValue, SECRET_KEY);
  //     } catch (e) {
  //       return null; // 유효한 토큰이 아니면 null 반환
  //     }
  //   },
};