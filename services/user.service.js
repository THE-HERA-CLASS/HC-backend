const UserRepository = require('../repositories/user.repository.js');

class UserService {
  userRepository = new UserRepository();

  emailExists = async (email) => {
    try {
      return await this.userRepository.emailExists(email);
    } catch (err) {
      console.error(err);
    }
  };

  nicknameExists = async (nickname) => {
    try {
      return await this.userRepository.nicknameExists(nickname);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserService;
