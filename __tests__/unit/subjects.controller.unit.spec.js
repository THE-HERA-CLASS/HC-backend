const ExaminfoController = require('../../controllers/examinfo.controller.js');

let mockExaminfoService = {
  addSubject: jest.fn(),
  getSubject: jest.fn(),
  getSubjectWithCertificateId: jest.fn(),
  getSubjectWithSubjectId: jest.fn(),
  updateSubject: jest.fn(),
  dropSubject: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
};

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
      name: '데이터베이스',
    };
    const { certificate_id, name } = mockRequest.body;
    const returnValue = true;
    mockExaminfoService.addSubject = jest.fn(() => returnValue);
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.addSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.addSubject).toHaveBeenCalledWith(certificate_id, name);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '과목 등록 완료' });
  });

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed', async () => {
    mockRequest.body = {
      certificate_id: 1,
      name: '데이터베이스',
    };
    const { certificate_id, name } = mockRequest.body;
    const returnValue = false;
    mockExaminfoService.addSubject = jest.fn(() => returnValue);
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.addSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.addSubject).toHaveBeenCalledWith(certificate_id, name);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 등록 실패' });
  });

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed / certificate_id = null', async () => {
    mockRequest.body = {
      certificate_id: null,
      name: '데이터베이스',
    };
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
  });

  test('Unit Test / Controller / Examinfo - Subject / addSubject : Failed / name = null', async () => {
    mockRequest.body = {
      certificate_id: 1,
      name: null,
    };
    await examinfoController.addSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / getSubject : Success', async () => {
    const returnValue = ['1', '2'];
    mockExaminfoService.getSubject = jest.fn(() => returnValue);
    await examinfoController.getSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubject).toHaveBeenCalledWith();
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
  });

  test('Unit Test / Controller / Examinfo - Subject / getSubject : Failed', async () => {
    const returnValue = [];
    mockExaminfoService.getSubject = jest.fn(() => returnValue);
    await examinfoController.getSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubject).toHaveBeenCalledWith();
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 전체 조회 실패' });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithCertificateId : Success', async () => {
    mockRequest.params = { certificate_id: 1 };
    const returnValue = ['과목1', '과목2'];
    mockExaminfoService.getSubjectWithCertificateId = jest.fn(() => returnValue);
    await examinfoController.getSubjectWithCertificateId(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubjectWithCertificateId).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubjectWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
  });

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithCertificateId : Failed', async () => {
    mockRequest.params = { certificate_id: 1 };
    const returnValue = [];
    mockExaminfoService.getSubjectWithCertificateId = jest.fn(() => returnValue);
    await examinfoController.getSubjectWithCertificateId(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubjectWithCertificateId).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubjectWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 자격증 과목 조회 실패' });
  });

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithCertificateId : Failed / certificate_id가 null', async () => {
    mockRequest.params = {};
    await examinfoController.getSubjectWithCertificateId(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithSubjectId : Success', async () => {
    mockRequest.params = { subject_id: 1 };
    const returnValue = '과목1';
    mockExaminfoService.getSubjectWithSubjectId = jest.fn(() => returnValue);
    await examinfoController.getSubjectWithSubjectId(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubjectWithSubjectId).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubjectWithSubjectId).toHaveBeenCalledWith(mockRequest.params.subject_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
  });

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithSubjectId : Failed', async () => {
    mockRequest.params = { subject_id: 1 };
    const returnValue = null;
    mockExaminfoService.getSubjectWithSubjectId = jest.fn(() => returnValue);
    await examinfoController.getSubjectWithSubjectId(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.getSubjectWithSubjectId).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.getSubjectWithSubjectId).toHaveBeenCalledWith(mockRequest.params.subject_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 과목 조회 실패' });
  });

  test('Unit Test / Controller / Examinfo - Subject / getSubjectWithSubjectId : Failed / subject_id가 null', async () => {
    mockRequest.params = {};
    await examinfoController.getSubjectWithSubjectId(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / updateSubject : Success', async () => {
    mockRequest.params = { subject_id: 1 };
    mockRequest.body = {
      certificate_id: 1,
      name: '과목1 수정',
    };
    const { subject_id } = mockRequest.params;
    const { certificate_id, name } = mockRequest.body;
    const returnValue = true;
    mockExaminfoService.updateSubject = jest.fn(() => returnValue);
    await examinfoController.updateSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.updateSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.updateSubject).toHaveBeenCalledWith(subject_id, certificate_id, name);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '과목 수정 완료' });
  });

  test('Unit Test / Controller / Examinfo - Subject / updateSubject : Failed', async () => {
    mockRequest.params = { subject_id: 1 };
    mockRequest.body = { certificate_id: 1, name: '과목1 수정' };
    const { subject_id } = mockRequest.params;
    const { certificate_id, name } = mockRequest.body;
    const returnValue = false;
    mockExaminfoService.updateSubject = jest.fn(() => returnValue);
    await examinfoController.updateSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.updateSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.updateSubject).toHaveBeenCalledWith(subject_id, certificate_id, name);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 수정 실패' });
  });

  test('Unit Test / Controller / Examinfo - Subject / updateSubject : Failed / subject_id가 null', async () => {
    mockRequest.params = {};
    await examinfoController.updateSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
  });

  // --------------------------

  test('Unit Test / Controller / Examinfo - Subject / dropSubject : Success', async () => {
    mockRequest.params = { subject_id: 1 };
    const { subject_id } = mockRequest.params;
    const returnValue = true;
    mockExaminfoService.dropSubject = jest.fn(() => returnValue);
    await examinfoController.dropSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.dropSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.dropSubject).toHaveBeenCalledWith(subject_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: '과목 삭제 완료' });
  });

  test('Unit Test / Controller / Examinfo - Subject / dropSubject : Failed', async () => {
    mockRequest.params = { subject_id: 1 };
    const { subject_id } = mockRequest.params;
    const returnValue = false;
    mockExaminfoService.dropSubject = jest.fn(() => returnValue);
    await examinfoController.dropSubject(mockRequest, mockResponse);

    // 해당 메서드 실행을 정상적으로 1번 하는가?
    expect(mockExaminfoService.dropSubject).toHaveBeenCalledTimes(1);
    // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    expect(mockExaminfoService.dropSubject).toHaveBeenCalledWith(subject_id);
    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '과목 삭제 실패' });
  });

  test('Unit Test / Controller / Examinfo - Subject / dropSubject : Failed / subject_id가 null', async () => {
    mockRequest.params = {};
    await examinfoController.dropSubject(mockRequest, mockResponse);

    // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
  });
});