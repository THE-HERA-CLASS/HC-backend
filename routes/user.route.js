const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller.js');

const userController = new UserController();

router.get('/emailExists', userController.emailExists);
router.get('/nicknameExists', userController.nicknameExists);
router.post('/signup', userController.signup);
router.delete('/withdrawal/:user_id', userController.withdrawal);
router.get('/profile/:user_id', userController.getProfile);
router.put('/profile/:user_id', userController.updateProfile);

module.exports = router;
