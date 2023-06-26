const BookmarkRepository = require('../repositories/bookmark.repository');
const { Bookmarks, Questions } = require('../models/index.js');

class BookmarkService {
  BookmarksRepository = new BookmarkRepository(Bookmarks, Questions);

  // 내가 북마크한 모든 문제 가져오기
  findAllBookmark = async (user_id) => {
    const findAllBookmark = await this.BookmarksRepository.findAllBookmark(user_id);
    return findAllBookmark;
  };

  // 북마크 확인
  findOneBookmark = async (question_id,user_id) => {
    const findOneBookmark = await this.BookmarksRepository.findOneBookmark(question_id, user_id);
    return findOneBookmark;
  };

  // 북마크 등록
  updateBookmark = async (question_id, user_id) => {
    const updateBookmark = await this.BookmarksRepository.updateBookmark(question_id, user_id);
    return updateBookmark;
  };

  // 북마크 등록취소
  deleteBookmark = async (question_id, user_id) => {
    const deleteBookmark = await this.BookmarksRepository.deleteBookmark(question_id, user_id);
    return deleteBookmark;
  };
  // bookmark_count up
  plusQuestionBookmark = async (question_id) => {
    try {
      return await this.BookmarksRepository.plusQuestionBookmark(question_id);
    } catch (err) {
      console.error(err);
    }
  };
  // bookmark_count down
  minusQuestionBookmark = async (question_id) => {
    try {
      return await this.BookmarksRepository.minusQuestionBookmark(question_id);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = BookmarkService;
