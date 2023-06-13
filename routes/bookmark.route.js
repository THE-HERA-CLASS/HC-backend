const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

const BookmarkController = require('../controllers/bookmark.controller.js');
const bookmarkController = new BookmarkController();

router.post('/bookmark/:question_id', authMiddleware, bookmarkController.createBookmark);

module.exports = router;
