const BookmarkService = require('../services/bookmark.service.js');

class BookmarksController {
  bookmarksService = new BookmarkService();

  updateBookmark = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { question_id } = req.body;

      const findBookmarkData = await this.bookmarksService.findOneBookmark(question_id, user_id);
      // 이미 북마크 되어있다면
      if (findBookmarkData) {
        await this.bookmarksService.deleteBookmark(question_id, user_id);
        await this.bookmarksService.minusQuestionBookmark(question_id);
        res.status(200).json({ msg: '북마크가 취소되었습니다.' });
      } else {
        // 북마크 등록
        await this.bookmarksService.updateBookmark(question_id, user_id);
        await this.bookmarksService.plusQuestionBookmark(question_id);
        res.status(200).json({ msg: '북마크에 등록되었습니다.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({ errMsg: '북마크 등록에 실패하였습니다.' });
    }
  };
}

module.exports = BookmarksController;
