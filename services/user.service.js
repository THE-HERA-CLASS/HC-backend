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

  signup = async (userData) => {
    try {
      return await this.userRepository.signup(userData);
    } catch (err) {
      console.error(err);
    }
  };

  withdrawal = async (user_id) => {
    try {
      return await this.userRepository.withdrawal(user_id);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserService;
