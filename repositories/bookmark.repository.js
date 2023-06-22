class BookmarksRepository {
  constructor(BookmarksModel, QuestionsModel) {
    this.bookmarksModel = BookmarksModel;
    this.questionsModel = QuestionsModel;
  }
  // 북마크 생성
  updateBookmark = async (question_id, user_id) => {
    // 해당 문제의 exam_id 가져오기 위해
    const question = await this.questionsModel.findOne({
      where: { question_id: question_id },
    });
    // 북마크할 문제가 존재x
    if (!question) {
      //console.error('문제를 찾을 수 없습니다.');
      throw new Error('문제를 찾을 수 없습니다.'); // 이렇게 해야지 다음 로직을 수행안함
    }
    const updateBookmarkData = await this.bookmarksModel.create({
      question_id,
      user_id,
      exam_id: question.exam_id,
    });
    return updateBookmarkData;
  };

  // 북마크 확인
  findOneBookmark = async (question_id, user_id) => {
    const findOneBookmarkData = await this.bookmarksModel.findOne({
      where: { question_id, user_id },
    });
    return findOneBookmarkData;
  };

  // 북마크 취소
  deleteBookmark = async (question_id, user_id) => {
    const deleteBookmarkData = await this.bookmarksModel.destroy({
      where: { question_id, user_id },
    });
    return deleteBookmarkData;
  };

  plusQuestionBookmark = async (question_id) => {
    await this.questionsModel.increment('bookmark_count', { where: { question_id: question_id } });
  };

  minusQuestionBookmark = async (question_id) => {
    await this.questionsModel.decrement('bookmark_count', { where: { question_id: question_id } });
  };
}

module.exports = BookmarksRepository;
