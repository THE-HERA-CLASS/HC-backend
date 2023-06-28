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

  // updateBookmark 유닛 성공케이스 테스트
  test('Bookmark updateBookmark Unit Test : Success', async () => {
    const user_id = 3;
    const question_id = 1;
    mockResponse.locals.user = { user_id };
    mockRequest.body = { question_id };
    const findBookmarkReturnValue = {
      bookmark_id: 1,
      user_id: 3,
      question_id: 1,
    };
    const updateBookmarkReturnValue = {
      bookmark_id: 2,
      user_id: 3,
      question_id: 1,
    };

    // ======================== 북마크가 이미 존재하는 경우 ========================
    // 특정문제에 대한 북마크가 없으면 북마크 등록, bookmark_count 1증가
    mockBookmarkService.findOneBookmark = jest.fn(() => {
      return findBookmarkReturnValue;
    });
    // 가짜 deleteBook 메서드 대체
    mockBookmarkService.deleteBookmark = jest.fn();
    // 가짜 minusQuestionBookmark 메서드 대체
    mockBookmarkService.minusQuestionBookmark = jest.fn();
    // 가짜 요청과 응갑 객체를 사용, updateBookmark 컨트롤러 호출
    await bookmarkController.updateBookmark(mockRequest, mockResponse);

    // 1-1. deleteBookmark메서드가 호출되는가?
    expect(mockBookmarkService.deleteBookmark).toHaveBeenCalledTimes(1);
    // 1-2. deleteBookmark 메서드가 특정 인자(question_id, user_id)와 함께 호출되었는가?
    expect(mockBookmarkService.deleteBookmark).toHaveBeenCalledWith(question_id, user_id);
    // 2-1. minusQuestionBookmark 메서드가 호출되었는가?
    expect(mockBookmarkService.minusQuestionBookmark).toHaveBeenCalledTimes(1);
    // 2-2. minusQuestionBookmark 메서드가 특정 인자(question_id)와 함께 호출되었는가?
    expect(mockBookmarkService.minusQuestionBookmark).toHaveBeenCalledWith(question_id);
    // 3-1 상태코드가 200, json 응답 메세직가 올바른가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '북마크가 취소되었습니다.' });

    // ======================== 북마크가 존재하지 않는 경우 ========================
    // 특정문제에 대한 북마크가 존재한다면 북마크 취소, bookmark_count 1감소
    // 가짜 findOneBookmark 메서드 대체
    mockBookmarkService.findOneBookmark = jest.fn(); // 반환값이 없으므로 mock 함수만 설정
    // 가짜 updateBookmark 메서드 대체
    mockBookmarkService.updateBookmark = jest.fn(() => {
      return updateBookmarkReturnValue;
    });
    // 가짜 plusQuestionBookmark 메서드 대체
    mockBookmarkService.plusQuestionBookmark = jest.fn();
    // 가짜 요청과 응갑 객체를 사용, updateBookmark 컨트롤러 호출
    await bookmarkController.updateBookmark(mockRequest, mockResponse);

    // 1-1. updateBookmark메서드가 호출되는가?
    expect(mockBookmarkService.updateBookmark).toHaveBeenCalledTimes(1);
    // 1-2. updateBookmark 메서드가 특정 인자(question_id, user_id)와 함께 호출되었는가?
    expect(mockBookmarkService.updateBookmark).toHaveBeenCalledWith(question_id, user_id);
    // 2-1. plusQuestionBookmark 메서드가 호출되었는가?
    expect(mockBookmarkService.plusQuestionBookmark).toHaveBeenCalledTimes(1);
    // 2-2. plusQuestionBookmark 메서드가 특정 인자(question_id)와 함께 호출되었는가?
    expect(mockBookmarkService.plusQuestionBookmark).toHaveBeenCalledWith(question_id);
    // 3-1 상태코드가 200, json 응답 메세직가 올바른가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '북마크에 등록되었습니다.' });
  });

  // updateBookmark 유닛 실패케이스 테스트 - user_id가 null이라면?
  test('Bookmark updateBookmark Unit Test : false / user_id = null', async () => {
    const user_id = null;
    const question_id = 1;
    mockResponse.locals.user = { user_id };
    mockRequest.body = { question_id };

    // user_id가 null일때의 특정 조건만 함수만 입력
    await bookmarkController.updateBookmark(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '북마크 등록에 필요한 정보가 부족합니다.' });
  });

   // updateBookmark 유닛 실패케이스 테스트 - question_id가 null이라면?
   test('Bookmark updateBookmark Unit Test : false / question_id = null', async () => {
    const user_id = 3;
    const question_id = null;
    mockResponse.locals.user = { user_id };
    mockRequest.body = { question_id };

    // user_id가 null일때의 특정 조건만 함수만 입력
    await bookmarkController.updateBookmark(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '북마크 등록에 필요한 정보가 부족합니다.' });
  });
});
