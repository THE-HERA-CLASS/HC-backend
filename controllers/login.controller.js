const loginService = require('../services/login.service.js');

class LoginController {
  loginService = new loginService();
}

module.exports = LoginController;
