const ExaminfoController = require('../../controllers/examinfo.controller');

let mockExaminfoService = {
    emailExists: jest.fn(),
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

    // basic form
    // test('Unit Test / Controller / Examinfo - Exams / ', async () => {
        
    // })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Exams / addExam', async () => {
        const requestBody = {
            major_id: 1,
            certificate_id: 1,
            subject_id: 1,
            year: 2022,
            round: 1
        }
        mockRequest.body = requestBody;
        
    })
});