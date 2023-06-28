const XnotesController = require('../../controllers/xnote.controller');

// 가짜 XnotesService
let mockXnotesService = {
  submitAnswer: jest.fn(),
};
// 가짜 ExaminfoService
let mockExaminfoService = {
  getExamWithexam_id: jest.fn(),
};
// 가짜 요청
let mockRequest = {
  body: jest.fn(),
};
// 가짜 응답
let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};

let xnotesController = new XnotesController();

xnotesController.xnotesService = mockXnotesService;
xnotesController.examinfoService = mockExaminfoService;

// XnotesController submitAnswer 메서드 테스트
describe('Xnotes Controller Unit Test - submitAnswer', () => {
  // 각 테스트가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 mock 객체 초기화
  });

  test('submitAnswer - Success', async () => {
    const user_id = 1;
    const exam_id = 1;
    const requestData = { /* 적절한 테스트용 요청 데이터 입력 */ };
    const reqCount = Object.keys(requestData).length;
    const resCount = /* 적절한 테스트용 응답 데이터 입력 */;

    mockResponse.status = jest.fn(() => mockResponse);
    mockResponse.json = jest.fn(() => mockResponse);

    mockResponse.locals.user = { user_id: user_id };
    mockRequest.body = { exam_id: exam_id, data: requestData };

    mockXnotesService.submitAnswer = jest.fn(() => resCount);
    mockExaminfoService.getExamWithexam_id = jest.fn(() => /* 적절한 테스트용 시험 데이터 입력 */);

    await xnotesController.submitAnswer(mockRequest, mockResponse);

    // 1. user_id 값이 제대로 전달되는지 확인
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '답안 제출 완료' });
    // 2. submitAnswer 메서드가 호출되었는지 확인
    expect(mockXnotesService.submitAnswer).toHaveBeenCalledTimes(1);
    // 3. getExamWithexam_id 메서드가 호출되었는지 확인
    expect(mockExaminfoService.getExamWithexam_id).toHaveBeenCalledTimes(1);
  });

  test('submitAnswer - Failure: Missing user_id', async () => {
    mockResponse.status = jest.fn(() => mockResponse);
    mockResponse.json = jest.fn(() => mockResponse);

    mockResponse.locals.user = {};
    mockRequest.body = { /* 적절한 테스트용 요청 데이터 입력 */ };

    await xnotesController.submitAnswer(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: user_id' });
  });

  // 이하 실패 케이스들 추가 작성

});
