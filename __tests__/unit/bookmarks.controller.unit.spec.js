const BookmarkController = require('../../controllers/bookmark.controller');

let mockBookmarkService = {
  findAllBookmark: jest.fn(),
  deleteBookmark: jest.fn(),
  minusQuestionBookmark: jest.fn(),
  updateBookmark: jest.fn(),
  plusQuestionBookmark: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};

let bookmarkController = new BookmarkController();

bookmarkController.bookmarkService = mockBookmarkService;

describe('Unit Test / Controller / Bookmark', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test('Unit Test / Controller / Bookmark / findAllBookmark : Success', async () => {
    const user_id = 3;
    mockResponse.locals.user = { user_id };
    const findAllBookmarkReturnValue = {
      bookmark_id: 1,
      user_id: 3,
      exam_id: 1,
      question_id: 1,
    };
    mockBookmarkService.findAllBookmark = jest.fn(() => {
      return findAllBookmarkReturnValue;
    });
    await bookmarkController.findAllBookmark(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockBookmarkService.findAllBookmark).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockBookmarkService.findAllBookmark).toHaveBeenCalledWith(user_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ data: findAllBookmarkReturnValue });
  });

  test('Unit Test / Controller / Bookmark / findAllBookmark : Failed / user_id = null ', async () => {
    const user_id = null;
    mockResponse.locals.user = { user_id };
    const findAllBookmarkReturnValue = {
      errMsg: '북마크 조회에 필요한 정보가 부족합니다.',
    };
    mockBookmarkService.findAllBookmark = jest.fn(() => {
      return findAllBookmarkReturnValue;
    });
    await bookmarkController.findAllBookmark(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith(findAllBookmarkReturnValue);
  });

  test('Unit Test / Controller / Bookmark / findAllBookmark : Failed / findAllBookmarkData is null ', async () => {
    const user_id = 3;
    mockResponse.locals.user = { user_id };
    const findAllBookmarkReturnValue = null;
    mockBookmarkService.findAllBookmark = jest.fn(() => {
      return findAllBookmarkReturnValue;
    });
    await bookmarkController.findAllBookmark(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '북마크한 문제가 없습니다.' });
  });
});
