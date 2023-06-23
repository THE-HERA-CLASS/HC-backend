class UserRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }

  emailExists = async (email) => {
    try {
      return await this.usersModel.findOne({ where: { email } });
    } catch (err) {
      console.error(err);
    }
  };

  nicknameExists = async (nickname) => {
    try {
      return await this.usersModel.findOne({ where: { nickname } });
    } catch (err) {
      console.error(err);
    }
  };

  signup = async (userData) => {
    try {
      return await this.usersModel.create({
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

  findPassword = async (email) => {
    try {
      return await this.usersModel.findOne({
        attributes: ['password'],
        where: { email },
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  
  findEmail = async (nickname) => {
    try{
      return await this.usersModel.findOne({
        attributes: ['email'],
        where: {nickname},
      });
    }catch(err){
      console.log(err);
      throw err;
    }
  }

  withdrawal = async (user_id) => {
    try {
      return await this.usersModel.destroy({ where: { user_id } });
    } catch (err) {
      console.error(err);
    }
  };

  getProfile = async (user_id) => {
    try {
      return await this.usersModel.findOne({
        attributes: ['user_id', 'email', 'nickname', 'image', 'authority', 'major_id', 'createdAt', 'updatedAt'],
        where: { user_id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  updateProfile = async (userData) => {
    try {
      return await this.usersModel.update(
        {
          email: userData.email,
          nickname: userData.nickname,
          password: userData.password,
          image: userData.image,
          authority: userData.authority,
          major_id: userData.major_id,
        },
        { where: { user_id: userData.user_id } }
      );
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = UserRepository;
