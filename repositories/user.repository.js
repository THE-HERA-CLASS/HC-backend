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
}

module.exports = UserRepository;
