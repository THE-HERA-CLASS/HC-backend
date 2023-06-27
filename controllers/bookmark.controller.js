const BookmarkService = require('../services/bookmark.service.js');

class BookmarksController {
  bookmarkService = new BookmarkService();

  findAllBookmark = async (req, res) => {
    try {
      const { user_id } = res.locals.user;

      if (!user_id) {
        return res.status(411).json({ errMsg: '북마크 조회에 필요한 정보가 부족합니다.' });
      }
      const findAllBookmarkData = await this.bookmarkService.findAllBookmark(user_id);
      if (!findAllBookmarkData) {
        res.status(411).json({ errMsg: '북마크한 문제가 없습니다.' });
      } else {
        res.status(200).json({ data: findAllBookmarkData });
      }
    } catch (error) {
      return res.status(400).json({ errMsg: '북마크한 문제 불러오기에 실패하였습니다.' });
    }
  };

  updateBookmark = async (req, res) => {
    try {
      const { user_id } = res.locals.user;
      const { question_id } = req.body;

      if (!user_id || !question_id) {
        // console.log(user_id, question_id)
        return res.status(411).json({ errMsg: '북마크 등록에 필요한 정보가 부족합니다.' });
      }
      const findBookmarkData = await this.bookmarkService.findOneBookmark(question_id, user_id);
      // 이미 북마크 되어있다면
      if (findBookmarkData) {
        await this.bookmarkService.deleteBookmark(question_id, user_id);
        await this.bookmarkService.minusQuestionBookmark(question_id);
        res.status(200).json({ msg: '북마크가 취소되었습니다.' });
      } else {
        // 북마크 등록
        await this.bookmarkService.updateBookmark(question_id, user_id);
        await this.bookmarkService.plusQuestionBookmark(question_id);
        res.status(200).json({ msg: '북마크에 등록되었습니다.' });
      }
    } catch (error) {
      return res.status(400).json({ errMsg: '북마크 등록에 실패하였습니다.' });
    }
  };
}

module.exports = BookmarksController;
