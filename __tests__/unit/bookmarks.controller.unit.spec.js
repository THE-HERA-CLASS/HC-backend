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

// 북마크 컨트롤러 계층 유닛 테스트
// Bookmark Controller Unit Test
describe('Bookmark Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행된다
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 mock을 초기화

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  // findAllBookmark 유닛 성공케이스 테스트
  test('Bookmark findAllBookmark Unit Test : Success', async () => {
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

    // 1. Request body 데이터가 제대로 findAllBookmark에 전달되는가?
    expect(mockBookmarkService.findAllBookmark).toHaveBeenCalledTimes(1);
    // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
    expect(mockBookmarkService.findAllBookmark).toHaveBeenCalledWith(user_id);
    // 3. 상태 응답값과 응답 값은 맞는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ data: findAllBookmarkReturnValue });
  });

  // user_id가 null일때 실패케이스 테스트
  test('Bookmark findAllBookmark Unit Test : false/ user_id = null ', async () => {
    // user_id가 null
    const user_id = null;
    mockResponse.locals.user = { user_id };
    const findAllBookmarkReturnValue = {
      errMsg: '북마크 조회에 필요한 정보가 부족합니다.',
    };
    mockBookmarkService.findAllBookmark = jest.fn(() => {
      return findAllBookmarkReturnValue;
    });
    await bookmarkController.findAllBookmark(mockRequest, mockResponse);

    // 1번 호출하느냐, 상태코드가 411이냐, json에 errMsg가 담기는가
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith(findAllBookmarkReturnValue);
  });

  // findAllBookmarkData가 null일때 실패케이스 테스트
  test('Bookmark findAllBookmark Unit Test : false/ findAllBookmarkData = null ', async () => {
    const user_id = 3;
    mockResponse.locals.user = { user_id };
     // findAllBookmarkData가 null
    const findAllBookmarkReturnValue = null;
    mockBookmarkService.findAllBookmark = jest.fn(() => {
      return findAllBookmarkReturnValue;
    });
    await bookmarkController.findAllBookmark(mockRequest, mockResponse);

    // 1번 호출하느냐, 상태코드가 411이냐, json에 errMsg가 담기는가
    expect(mockBookmarkService.findAllBookmark).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '북마크한 문제가 없습니다.' });
  });
});
