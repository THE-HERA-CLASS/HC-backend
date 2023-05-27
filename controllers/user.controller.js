const UserService = require('../services/user.service.js');
const resUtil = require('../utils/response.util.js');

class UserController {
  userService = new UserService();

  emailExists = async (req, res, next) => {
    try {
      const email = req.query.email;
      if (!email) {
        throw resUtil(411, '값 없음 : email');
      }
      const emailExistsData = await this.userService.emailExists(email);
      if (!emailExistsData) {
        throw resUtil(200, '이메일 사용 가능');
      } else {
        throw resUtil(201, '이메일 사용 불가능');
      }
    } catch (err) {
      err.failedMsg = '전체 에러';
      next(err);
    }
  };

  nicknameExists = async (req, res, next) => {
    try {
      const nickname = req.query.nickname;
      if (!nickname) {
        throw resUtil(411, '값 없음 : nickname');
      }
      const nicknameExistsData = await this.userService.nicknameExists(
        nickname
      );
      if (!nicknameExistsData) {
        throw resUtil(200, '닉네임 사용 가능');
      } else {
        throw resUtil(201, '닉네임 사용 불가능');
      }
    } catch (err) {
      err.failedMsg = '전체 에러';
      next(err);
    }
  };

  signup = async (req, res) => {
    try {
      const { email, nickname, password, image, major_id } = req.body;
      if (!email) return res.status(411).json({ errMsg: '값 없음 : email' });
      if (!nickname)
        return res.status(411).json({ errMsg: '값 없음 : nickname' });
      if (!password)
        return res.status(411).json({ errMsg: '값 없음 : password' });
      if (!major_id)
        return res.status(411).json({ errMsg: '값 없음 : major_id' });
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+(\.[a-zA-Z]+)?$/.test(email)) {
        return res
          .status(412)
          .json({ errMsg: '형식 에러: 올바른 이메일 형식이 아닙니다' });
      }
      if (!/^[\w가-힣]{2,10}$/.test(nickname)) {
        return res.status(412).json({
          errMsg:
            '형식 에러: 닉네임은 2~10자의 영문, 한글, 숫자, 밑줄(_)만 허용됩니다',
        });
      }
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,15}$/.test(
          password
        )
      ) {
        return res.status(412).json({
          errMsg:
            '형식 에러: 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함한 8~15자여야 합니다',
        });
      }
      const userData = {
        email,
        nickname,
        password,
        image,
        major_id,
      };
      const signupResult = await this.userService.signup(userData);
      if (signupResult) {
        return res.status(200).json({ msg: '회원가입 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원가입 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  withdrawal = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;  // 원래는 로그인 쿠키에서 가져와야하지만, 지금은 구현안되서 직접할당
      const { user_id } = req.params;
      if (!user_id) {
        res.status(411).json({ errMsg: '값 없음 : user_id' });
      }
      const userWithdrawal = await this.userService.withdrawal(user_id);
      if (userWithdrawal) {
        return res.status(200).json({ msg: '회원탈퇴 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원탈퇴 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  getProfile = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;  // 원래는 로그인 쿠키에서 가져와야하지만, 지금은 구현안되서 직접할당
      const { user_id } = req.params;
      if (!user_id) {
        res.status(411).json({ errMsg: '값 없음 : user_id' });
      }
      const getProfileData = await this.userService.getProfile(user_id);
      if (getProfileData) {
        return res.status(200).json({ data: getProfileData });
      } else {
        return res.status(419).json({ errMsg: '회원정보 조회 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };

  updateProfile = async (req, res) => {
    try {
      // const { user_id } = res.locals.user;  // 원래는 로그인 쿠키에서 가져와야하지만, 지금은 구현안되서 직접할당
      const { user_id } = req.params;
      const userData = {
        user_id,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        image: req.body.image,
        authority: req.body.authority,
        major_id: req.body.major_id,
      };
      const updateProfileData = await this.userService.updateProfile(userData);
      if (updateProfileData) {
        return res.status(200).json({ msg: '회원정보 수정 완료' });
      } else {
        return res.status(419).json({ errMsg: '회원정보 수정 실패' });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ errMsg: '전체 에러' });
    }
  };
}

module.exports = UserController;
