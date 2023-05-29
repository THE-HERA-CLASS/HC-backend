const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const LoginController = require('../controllers/login.controller.js');
const loginController = new LoginController();

router.post('/login', loginController.login);
router.post('/logout',authMiddleware,loginController.logout);

module.exports = router;
