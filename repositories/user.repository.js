const { Users } = require('../models');

class UserRepository {
  // constructor(users) {
  //   this.usersModel = users;
  // }

  emailExists = async (email) => {
    try {
      return await Users.findOne({ where: { email } });
    } catch (err) {
      console.error(err);
    }
  };

  nicknameExists = async (nickname) => {
    try {
      return await Users.findOne({ where: { nickname } });
    } catch (err) {
      console.error(err);
    }
  };

  signup = async (userData) => {
    try {
      return await Users.create({
        email: userData.email,
        nickname: userData.nickname,
        password: userData.password,
        image: userData.image,
        major_id: userData.major_id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  withdrawal = async (user_id) => {
    try {
      return await Users.destroy({ where: { user_id } });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserRepository;
