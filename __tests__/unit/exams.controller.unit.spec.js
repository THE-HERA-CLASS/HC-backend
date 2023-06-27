const ExaminfoController = require('../../controllers/examinfo.controller');

let mockExaminfoService = {
    addExam: jest.fn(),
    getExam: jest.fn(),
    getExamId: jest.fn(),
    getExamWithExamId: jest.fn(),
    getExamWithSubjectId: jest.fn(),
    getExamWithCertificateId: jest.fn(),
    updateExam: jest.fn(),
    deleteExam: jest.fn(),
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

describe('Unit Test / Controller / Examinfo - Exams', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    // --------------------------

    // test('Unit Test / Controller / Examinfo - Exams / ', async () => {
        
    // })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / addExam : Success', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        const { major_id, certificate_id, subject_id, year, round } = requestBody;
        const returnValue = {
            exam_id : 1,
            major_id : 11,
            major_name : '컴퓨터공학',
            certificate_id : 1,
            certificate_name : '정보처리기사',
            certificate_division : 'G',
            subject_id : 11,
            subject_name : '운영체제',
            year : 2000,
            round : 3,
        }
        mockExaminfoService.addExam = jest.fn(() => returnValue);
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addExam).toHaveBeenCalledWith(major_id, certificate_id, subject_id, year, round);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '시험지 등록 완료', data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        const { major_id, certificate_id, subject_id, year, round } = requestBody;
        const returnValue = null;
        mockExaminfoService.addExam = jest.fn(() => returnValue);
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addExam).toHaveBeenCalledWith(major_id, certificate_id, subject_id, year, round);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '시험지 등록 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed / major_id = null', async () => {
        const requestBody = {
            major_id: null,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed / certificate_id = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: null,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed / subject_id = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: null,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed / year = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: null,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: year' });
    })

    test('Unit Test / Controller / Examinfo - Exams / addExam : Failed / round = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: null
        }
        mockRequest.body = requestBody;
        await examinfoController.addExam(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: round' });
    })

    // --------------------------
    
    test('Unit Test / Controller / Examinfo - Exams / getExam : Success', async () => {
        const returnValue = [
            {
                exam_id : 1,
                major_id : 11,
                major_name : '컴퓨터공학',
                certificate_id : 1,
                certificate_name : '정보처리기사',
                certificate_division : 'G',
                subject_id : 11,
                subject_name : '운영체제',
                year : 2000,
                round : 3,
            },
        ]
        mockExaminfoService.getExam = jest.fn(() => returnValue);
        await examinfoController.getExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExam).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExam : Failed', async () => {
        const returnValue = []
        mockExaminfoService.getExam = jest.fn(() => returnValue);
        await examinfoController.getExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExam).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '시험지 조회 실패' });
    })

   // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Success', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        const returnValue = 10;
        mockExaminfoService.getExamId = jest.fn(() => returnValue);
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamId).toHaveBeenCalledWith(requestBody);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ exam_id: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        const returnValue = null;
        mockExaminfoService.getExamId = jest.fn(() => returnValue);
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamId).toHaveBeenCalledWith(requestBody);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '시험지 없음' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed / major_id = null', async () => {
        const requestBody = {
            major_id: null,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed / certificate_id = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: null,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed / subject_id = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: null,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed / year = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: null,
            round: 1
        }
        mockRequest.body = requestBody;
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: year' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamId : Failed / round = null', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: null
        }
        mockRequest.body = requestBody;
        await examinfoController.getExamId(mockRequest, mockResponse);
        
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: round' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / getExamWithExamId : Success', async () => {
        mockRequest.params = { exam_id : 1};
        const returnValue = {   exam_id : 1,
                                major_id : 11,
                                major_name : '컴퓨터공학',
                                certificate_id : 1,
                                certificate_name : '정보처리기사',
                                certificate_division : 'G',
                                subject_id : 11,
                                subject_name : '운영체제',
                                year : 2000,
                                round : 3,
                            };
        mockExaminfoService.getExamWithExamId = jest.fn(() => returnValue);
        await examinfoController.getExamWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithExamId).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithExamId : Failed', async () => {
        mockRequest.params = { exam_id : 1};
        const returnValue = null;
        mockExaminfoService.getExamWithExamId = jest.fn(() => returnValue);
        await examinfoController.getExamWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithExamId).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 시험지 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithExamId : Failed / exam_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getExamWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: exam_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / getExamWithSubjectId : Success', async () => {
        mockRequest.params = { subject_id : 11};
        const returnValue = {   exam_id : 1,
                                major_id : 11,
                                major_name : '컴퓨터공학',
                                certificate_id : 1,
                                certificate_name : '정보처리기사',
                                certificate_division : 'G',
                                subject_id : 11,
                                subject_name : '운영체제',
                                year : 2000,
                                round : 3,
                            };
        mockExaminfoService.getExamWithSubjectId = jest.fn(() => returnValue);
        await examinfoController.getExamWithSubjectId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithSubjectId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithSubjectId).toHaveBeenCalledWith(mockRequest.params.subject_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithSubjectId : Failed', async () => {
        mockRequest.params = { subject_id : 11};
        const returnValue = null;
        mockExaminfoService.getExamWithSubjectId = jest.fn(() => returnValue);
        await examinfoController.getExamWithSubjectId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithSubjectId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithSubjectId).toHaveBeenCalledWith(mockRequest.params.subject_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 시험지 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithSubjectId : Failed / subject_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getExamWithSubjectId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: subject_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / getExamWithCertificateId : Success', async () => {
        mockRequest.params = { certificate_id : 1 };
        const returnValue = {   exam_id : 1,
                                major_id : 11,
                                major_name : '컴퓨터공학',
                                certificate_id : 1,
                                certificate_name : '정보처리기사',
                                certificate_division : 'G',
                                subject_id : 11,
                                subject_name : '운영체제',
                                year : 2000,
                                round : 3,
                            };
        mockExaminfoService.getExamWithCertificateId = jest.fn(() => returnValue);
        await examinfoController.getExamWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithCertificateId : Failed', async () => {
        mockRequest.params = { certificate_id : 1 };
        const returnValue = null;
        mockExaminfoService.getExamWithCertificateId = jest.fn(() => returnValue);
        await examinfoController.getExamWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getExamWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getExamWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 시험지 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / getExamWithCertificateId : Failed / certificate_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getExamWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / updateExam : Success', async () => {
        mockRequest.params = { exam_id : 1 };
        mockRequest.body = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1,
        }
        const examData = {
            exam_id: mockRequest.params.exam_id,
            major_id: mockRequest.body.major_id,
            certificate_id: mockRequest.body.certificate_id,
            subject_id: mockRequest.body.subject_id,
            year: mockRequest.body.year,
            round: mockRequest.body.round,
        }
        const returnValue = {
            exam_id : 1,
            major_id : 1,
            major_name : '컴퓨터공학',
            certificate_id : 1,
            certificate_name : '정보처리기사',
            certificate_division : 'G',
            subject_id : 1,
            subject_name : '운영체제',
            year : 2022,
            round : 1,
        }
        mockExaminfoService.updateExam = jest.fn(() => returnValue);
        await examinfoController.updateExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateExam).toHaveBeenCalledWith(examData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '시험지 수정 완료', data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Exams / updateExam : Failed', async () => {
        mockRequest.params = { exam_id : 1 };
        mockRequest.body = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1,
        }
        const examData = {
            exam_id: mockRequest.params.exam_id,
            major_id: mockRequest.body.major_id,
            certificate_id: mockRequest.body.certificate_id,
            subject_id: mockRequest.body.subject_id,
            year: mockRequest.body.year,
            round: mockRequest.body.round,
        }
        const returnValue = null;
        mockExaminfoService.updateExam = jest.fn(() => returnValue);
        await examinfoController.updateExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateExam).toHaveBeenCalledWith(examData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '시험지 수정 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / updateExam : Failed / exam_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.updateExam(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: exam_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / deleteExam : Success', async () => {
        mockRequest.params = { exam_id: 1 };
        const returnValue = true;
        mockExaminfoService.deleteExam = jest.fn(() => returnValue);
        await examinfoController.deleteExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.deleteExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.deleteExam).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '시험지 삭제 완료' });
    })

    test('Unit Test / Controller / Examinfo - Exams / deleteExam : Failed', async () => {
        mockRequest.params = { exam_id: 1 };
        const returnValue = false;
        mockExaminfoService.deleteExam = jest.fn(() => returnValue);
        await examinfoController.deleteExam(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.deleteExam).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.deleteExam).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '시험지 삭제 실패' });
    })

    test('Unit Test / Controller / Examinfo - Exams / deleteExam : Failed / exam_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.deleteExam(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: exam_id' });
    })
});