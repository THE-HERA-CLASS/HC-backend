const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');

const BookmarkController = require('../controllers/bookmark.controller.js');
const bookmarkController = new BookmarkController();

router.put('/bookmark', authMiddleware, bookmarkController.updateBookmark);
router.get('/bookmark', authMiddleware, bookmarkController.findAllBookmark);
module.exports = router;
