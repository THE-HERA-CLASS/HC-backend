const BookmarkRepository = require('../repositories/bookmark.repository');
const { Bookmarks } = require('../models');

class BookmarkService {
  BookmarksRepository = new BookmarkRepository(Bookmarks);

  // 북마크 확인
  findOneBookmark = async (question_id, user_id) => {
    const findOneBookmark = await this.BookmarksRepository.findOneBookmark(question_id, user_id);
    return findOneBookmark;
  };

  // 북마크 등록
  createBookmark = async (question_id, user_id) => {
    const createBookmark = await this.BookmarksRepository.createBookmark(question_id, user_id);
    return createBookmark;
  };

  // 북마크 등록취소
  deleteBookmark = async (question_id, user_id) => {
    const deleteBookmark = await this.BookmarksRepository.deleteBookmark(question_id, user_id);
    return deleteBookmark;
  };
}

module.exports = BookmarkService;
