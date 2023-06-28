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
});
