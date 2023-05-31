const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME;
const REFRESH_TOKEN_EXPIRE_TIME = process.env.REFRESH_TOKEN_EXPIRE_TIME;

module.exports = {
  createAccessToken: (user_id, nickname, email, major_id, authority, image) => {
    return jwt.sign({ user_id, nickname, email, major_id, authority, image }, SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    });
  },

  createRefreshToken: () => {
    return jwt.sign({}, SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    });
  },
  // token type
  validateTokenType: (tokenType) => {
    try {
      return tokenType === 'Bearer' ? true : false;
    } catch (error) {
      return false;
    }
  },
  // token decode
  validateTokenValue: (tokenValue) => {
    try {
      console.log('SECRET_KEY: ', SECRET_KEY);
      return jwt.verify(tokenValue, SECRET_KEY);
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};
