const{ Bookmarks, Questions }= require('../models');

class BookmarksRepository {
  // 북마크 생성
  createBookmark = async (question_id, user_id) => {
    // 해당 문제의 exam_id 가져오기 위해
    const question = await Questions.findOne({
      where: { question_id: question_id },
    });
    // 북마크할 문제가 존재x
    if (!question) {
      //console.error('문제를 찾을 수 없습니다.');
      throw new Error('문제를 찾을 수 없습니다.'); // 이렇게 해야지 다음 로직을 수행안함
    }
    const createBookmarkData = await Bookmarks.create({
      question_id,
      user_id,
      exam_id: question.exam_id,
    });
    return createBookmarkData;
  };

  // 북마크 확인
  findOneBookmark = async (question_id, user_id) => {
    const findOneBookmarkData = await Bookmarks.findOne({
      where: { question_id, user_id },
    });
    return findOneBookmarkData;
  };

  // 북마크 취소
  deleteBookmark = async (question_id, user_id) => {
    const deleteBookmarkData = await Bookmarks.destroy({
      where: { question_id, user_id },
    });
    return deleteBookmarkData;
  };
}

module.exports = BookmarksRepository;
