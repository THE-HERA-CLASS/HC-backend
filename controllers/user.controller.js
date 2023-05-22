const UserService = require('../services/user.service.js');

class UserController {
  userService = new UserService();

  emailExists = async (req, res) => {
    const email = req.params.email;
    if (!email) {
      res.status(412).json({ errorMessage: '값 없음 : 이메일' });
    }
    const emailExistsData = await this.userService.emailExists(email);
    if (!emailExistsData) {
      return res.status(200).json({ message: '이메일 사용 가능' });
    } else {
      return res.status(204).json({ message: '이메일 사용 불가능' });
    }
  };

  nicknameExists = async (req, res) => {
    const nickname = req.params.nickname;
    if (!nickname) {
      res.status(411).json({ errorMessage: '값 없음 : nickname' });
    }
    const nicknameExistsData = await this.userService.nicknameExists(nickname);
    if (!nicknameExistsData) {
      return res.status(200).json({ message: '닉네임 사용 가능' });
    } else {
      return res.status(204).json({ message: '닉네임 사용 불가능' });
    }
  };

  signup = async (req, res) => {
    const { email, nickname, password, image, major_id } = req.body;
    if (!email)
      return res.status(411).json({ errorMessage: '값 없음 : email' });
    if (!nickname)
      return res.status(411).json({ errorMessage: '값 없음 : nickname' });
    if (!password)
      return res.status(411).json({ errorMessage: '값 없음 : password' });
    if (!major_id)
      return res.status(411).json({ errorMessage: '값 없음 : major_id' });
    if (!email.includes('@'))
      return res.status(412).json({ errorMessage: '형식 에러 : email @ 없음' });
    if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname)) {
      return res.status(412).json({ errorMessage: '형식 에러 : nickname' });
    }
    if (!/^[a-zA-Z0-9가-힣]+$/.test(password) || password.includes(nickname)) {
      return res.status(412).json({ errorMessage: '형식 에러 : password' });
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
      return res.status(200).json({ message: '회원가입 완료' });
    } else {
      return res.status(419).json({ errorMessage: '회원가입 실패' });
    }
  };

  withdrawal = async (req, res) => {
    // const { user_id } = res.locals.user;  // 원래는 로그인 쿠키에서 가져와야하지만, 지금은 구현안되서 직접할당
    const { user_id } = req.params;
    if (!user_id) {
      res.status(411).json({ errorMessage: '값 없음 : user_id' });
    }
    const userWithdrawal = await this.userService.withdrawal(user_id);
    if (userWithdrawal) {
      return res.status(200).json({ message: '회원탈퇴 완료' });
    } else {
      return res.status(419).json({ message: '회원탈퇴 실패' });
    }
  };

  getProfile = async (req, res) => {
    // const { user_id } = res.locals.user;  // 원래는 로그인 쿠키에서 가져와야하지만, 지금은 구현안되서 직접할당
    const { user_id } = req.params;
    if (!user_id) {
      res.status(411).json({ errorMessage: '값 없음 : user_id' });
    }
    const getProfileData = await this.userService.getProfile(user_id);
    if (getProfileData) {
      return res.status(200).json({ userData: getProfileData });
    } else {
      return res.status(419).json({ message: '회원정보 조회 실패' });
    }
  };

  updateProfile = async (req, res) => {
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
      return res.status(200).json({ message: '회원정보 수정 완료' });
    } else {
      return res.status(419).json({ message: '회원정보 수정 실패' });
    }
  };
}

module.exports = UserController;
