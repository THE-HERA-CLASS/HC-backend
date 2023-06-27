const ExaminfoController = require('../../controllers/examinfo.controller.js');

let mockExaminfoService = {
  addSubject: jest.fn(),
  getSubject: jest.fn(),
  getSubjectWithCertificateId: jest.fn(),
  getSubjectWithSubjectId: jest.fn(),
  updateSubject: jest.fn(),
  dropSubject: jest.fn(),
}

let mockRequest = {
    body: jest.fn(),
}

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    locals: jest.fn(),
}

let examinfoController = new ExaminfoController();

examinfoController.examinfoService = mockExaminfoService;

describe('Unit Test / Controller / Examinfo - Subject', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockResponse.status = jest.fn(() => {
        return mockResponse;
    });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Success', async () => {
    mockRequest.body = {
      certificate_id: 1,
      name: '데이터베이스'
    }
    const { certificate_id, name } = mockRequest.body;
    const returnValue = true;
    mockExaminfoService.addSubject = jest.fn(() => returnValue);
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.addSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.addSubject).toHaveBeenCalledWith(certificate_id, name)
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '과목 등록 완료' });
  })

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed', async () => {
    mockRequest.body = {
      certificate_id: 1,
      name: '데이터베이스'
    }
    const { certificate_id, name } = mockRequest.body;
    const returnValue = false;
    mockExaminfoService.addSubject = jest.fn(() => returnValue);
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.addSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.addSubject).toHaveBeenCalledWith(certificate_id, name)
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 등록 실패' });
  })

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed / certificate_id = null', async () => {
    mockRequest.body = {
      certificate_id: null,
      name: '데이터베이스'
    }
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
  })

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed / name = null', async () => {
    mockRequest.body = {
      certificate_id: 1,
      name: null
    }
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' });
  })

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / getSubject : Success', async () => {
    const returnValue = ['1', '2'];
    mockExaminfoService.getSubject = jest.fn(() => returnValue);
    await examinfoController.getSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubject).toHaveBeenCalledWith()
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
  })

  test('Unit Test / Controller / Examinfo - Subject / getSubject : Failed', async () => {
    const returnValue = [];
    mockExaminfoService.getSubject = jest.fn(() => returnValue);
    await examinfoController.getSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubject).toHaveBeenCalledWith()
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 전체 조회 실패' });
  })

  // --------------------------

  // test('Unit Test / Controller / Examinfo - Subject / getSubjectWithCertificateId : Success', async () => {
  //   mockRequest.params = { certificate_id: 1 };

  // })
  
  // --------------------------

  // test('Unit Test / Controller / Examinfo - Subject / ', async () => {

  // })
});