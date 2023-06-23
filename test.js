const UserService = require('../services/user.service');
const axios = require('axios');
const redisClient = require('../utils/redis.js');
require('dotenv').config();

class UserController {
  userService = new UserService();

  kakaologin = async (req, res) => {
    const { code } = req.body; // 카카오로그인 요청 후 받은 인가 코드
    try {
      // axios.post 메서드로 kakao api에 post요청을 보냄
      const res1 = await axios.post(
        'https://kauth.kakao.com/oauth/token', // 요청 URL
        {},
        {
          // 요청 헤더
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_SECRET_KEY,
            code: code, // 엎서 body로 받은 인가code
            redirect_uri: 'http://localhost:3000/kakao/callback', // 사용자 인증 후 리디렉션될 URL
          },
        }
      );

      // Access token을 이용해 정보 가져오기
      // axios.post 메서드로 kakao api에 post요청을 보냄
      const res2 = await axios.post(
        //요청 URL은 https://kapi.kakao.com/v2/user/me
        'https://kapi.kakao.com/v2/user/me',
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: 'Bearer ' + res1.data.access_token,
          },
        }
      );
      const data = res2.data;
      const email = data.kakao_account.email;
      const user = await this.userService.emailExists(email);

      if (!user) {
        const name = data.properties.nickname;

        await this.userService.signup(email, name);
        const userData = await this.userService.login(data.kakao_account.email);

        res.cookie('authorization', `${userData.accessObject.type} ${userData.accessObject.token}`);

        res.cookie('refreshToken', `${userData.refreshObject.token}`);

        res.cookie('user', `${userData.user_id}`);

        res.status(200).json({
          authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
          refreshToken: `${userData.refreshObject.token}`,
          user: `${userData.user_id}`,
          message: '회원가입 되었습니다!',
        });
      } else {
        const userData = await this.userService.login(data.kakao_account.email);

        res.cookie('authorization', `${userData.accessObject.type} ${userData.accessObject.token}`, {
          sameSite: 'none',
          secure: true,
        });

        res.cookie('refreshToken', `${userData.refreshObject.token}`, {
          sameSite: 'none',
          secure: true,
        });

        res.cookie('user', `${userData.user_id}`, {
          sameSite: 'none',
          secure: true,
        });

        res.status(200).json({
          authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
          refreshToken: `${userData.refreshObject.token}`,
          user: `${userData.user_id}`,
          message: '로그인 되었습니다!',
        });
      }
    } catch (error) {
      error.failedApi = '유저 소셜 로그인';
      throw error;
    }
  };
}
