const ExaminfoController = require('../../controllers/examinfo.controller.js');

let mockExaminfoService = {
    addCertificate: jest.fn(),
    getCertificate: jest.fn(),
    getCertificateWithMajorId: jest.fn(),
    getCertificateWithCertificateId: jest.fn(),
    updateCertificate: jest.fn(),
    dropCertificate: jest.fn(),
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

describe('Unit Test / Controller / Examinfo - Certificate', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });
    
    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / addCertificate : Success', async () => {
        mockRequest.body = {
            major_id: 1,
            name: '정보처리기사',
            division: 'G',
        }
        const { major_id, name, division } = mockRequest.body;
        const returnValue = true;
        mockExaminfoService.addCertificate = jest.fn(() => returnValue);
        await examinfoController.addCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addCertificate).toHaveBeenCalledWith(major_id, name, division)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '자격증 등록 완료' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / addCertificate : Failed', async () => {
        mockRequest.body = {
            major_id: 1,
            name: '정보처리기사',
            division: 'G',
        }
        const { major_id, name, division } = mockRequest.body;
        const returnValue = false;
        mockExaminfoService.addCertificate = jest.fn(() => returnValue);
        await examinfoController.addCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addCertificate).toHaveBeenCalledWith(major_id, name, division)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '자격증 등록 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / addCertificate : Failed / major_id = null', async () => {
        mockRequest.body = {
            major_id: null,
            name: '정보처리기사',
            division: 'G',
        }
        await examinfoController.addCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / addCertificate : Failed / name = null', async () => {
        mockRequest.body = {
            major_id: 1,
            name: null,
            division: 'G',
        }
        await examinfoController.addCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / addCertificate : Failed / division = null', async () => {
        mockRequest.body = {
            major_id: 1,
            name: '정보처리기사',
            division: null,
        }
        await examinfoController.addCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: division' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / getCertificate : Success', async () => {
        const returnValue = ['1', '2'];
        mockExaminfoService.getCertificate = jest.fn(() => returnValue);
        await examinfoController.getCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificate).toHaveBeenCalledWith()
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Certificate / getCertificate : Failed', async () => {
        const returnValue = [];
        mockExaminfoService.getCertificate = jest.fn(() => returnValue);
        await examinfoController.getCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificate).toHaveBeenCalledWith()
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '자격증 조회 실패' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithMajorId : Success', async () => {
        mockRequest.params = { major_id: 1 };
        const returnValue = [{ certificate_id: 1, name: '정보처리기사' }, { certificate_id: 2, name: '정보처리산업기사' }];
        mockExaminfoService.getCertificateWithMajorId = jest.fn(() => returnValue);
        await examinfoController.getCertificateWithMajorId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithMajorId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithMajorId).toHaveBeenCalledWith(mockRequest.params.major_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithMajorId : Failed', async () => {
        mockRequest.params = { major_id: 1 };
        const returnValue = [];
        mockExaminfoService.getCertificateWithMajorId = jest.fn(() => returnValue);
        await examinfoController.getCertificateWithMajorId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithMajorId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithMajorId).toHaveBeenCalledWith(mockRequest.params.major_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 전공 자격증 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithMajorId : Failed / major_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getCertificateWithMajorId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithCertificateId : Success', async () => {
        mockRequest.params = { certificate_id: 1 };
        const returnValue = { certificate_id: 1, name: '정보처리기사' };
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => returnValue);
        await examinfoController.getCertificateWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithCertificateId : Failed', async () => {
        mockRequest.params = { certificate_id: 1 };
        const returnValue = null;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => returnValue);
        await examinfoController.getCertificateWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(mockRequest.params.certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 자격증 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / getCertificateWithCertificateId : Failed / certificate_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getCertificateWithCertificateId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / updateCertificate : Success', async () => {
        mockRequest.params = { certificate_id: 1 };
        mockRequest.body = {
            major_id: 2,
            name: '사무자동화산업기사',
            division: 'S'
        }
        const { certificate_id } = mockRequest.params;
        const { major_id, name, division } = mockRequest.body;
        const existsExam = true;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);

        const returnValue = true;
        mockExaminfoService.updateCertificate = jest.fn(() => returnValue);
        await examinfoController.updateCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateCertificate).toHaveBeenCalledWith(certificate_id, major_id, name, division)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '자격증 수정 완료' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / updateCertificate : Failed', async () => {
        mockRequest.params = { certificate_id: 1 };
        mockRequest.body = {
            major_id: 2,
            name: '사무자동화산업기사',
            division: 'S'
        }
        const { certificate_id } = mockRequest.params;
        const { major_id, name, division } = mockRequest.body;
        const existsExam = true;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);

        const returnValue = false;
        mockExaminfoService.updateCertificate = jest.fn(() => returnValue);
        await examinfoController.updateCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateCertificate).toHaveBeenCalledWith(certificate_id, major_id, name, division)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '자격증 수정 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / updateCertificate : Failed / No Certificate', async () => {
        mockRequest.params = { certificate_id: 1 };
        mockRequest.body = {
            major_id: 2,
            name: '사무자동화산업기사',
            division: 'S'
        }
        const { certificate_id } = mockRequest.params;
        const { major_id, name, division } = mockRequest.body;
        const existsExam = false;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);
        await examinfoController.updateCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 자격증 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / updateCertificate : Failed / certificate_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.updateCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Certificate / dropCertificate : Success', async () => {
        mockRequest.params = { certificate_id: 1 };
        const { certificate_id } = mockRequest.params;
        const existsExam = true;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);

        const returnValue = true;
        mockExaminfoService.dropCertificate = jest.fn(() => returnValue);
        await examinfoController.dropCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.dropCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.dropCertificate).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '자격증 삭제 완료' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / dropCertificate : Failed', async () => {
        mockRequest.params = { certificate_id: 1 };
        const { certificate_id } = mockRequest.params;
        const existsExam = true;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);

        const returnValue = false;
        mockExaminfoService.dropCertificate = jest.fn(() => returnValue);
        await examinfoController.dropCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.dropCertificate).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.dropCertificate).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '자격증 삭제 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / dropCertificate : Failed / No Certificate', async () => {
        mockRequest.params = { certificate_id: 1 };
        const { certificate_id } = mockRequest.params;
        const existsExam = false;
        mockExaminfoService.getCertificateWithCertificateId = jest.fn(() => existsExam);
        await examinfoController.dropCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getCertificateWithCertificateId).toHaveBeenCalledWith(certificate_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청 자격증 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Certificate / dropCertificate : Failed / certificate_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.dropCertificate(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: certificate_id' });
    })
})