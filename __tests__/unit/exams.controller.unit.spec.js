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

    // test('Unit Test / Controller / Examinfo - Exams / ', async () => {
        
    // })
});