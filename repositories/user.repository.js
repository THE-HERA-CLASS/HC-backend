const { Users } = require('../models');

class UserRepository {
  // constructor(users) {
  //   this.usersModel = users;
  // }

  emailExists = async (email) => {
    try {
      const data = await Users.findOne({ where: { email } });
      console.log('repo data', data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserRepository;
