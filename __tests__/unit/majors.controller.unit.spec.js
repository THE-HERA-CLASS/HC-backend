const ExaminfoController = require('../../controllers/examinfo.controller.js');

let mockExaminfoService = {
    addMajor: jest.fn(),
    getMajors: jest.fn(),
    getOneMajor: jest.fn(),
    updateMajor: jest.fn(),
    dropMajor: jest.fn(),
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

describe('Unit Test / Controller / Examinfo - Major', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    test('Unit Test / Controller / Examinfo - Major / addMajor : Success', async () => {
        mockRequest.body = { name: '컴퓨터공학' };
        const functionResult = true;
        mockExaminfoService.addMajor = jest.fn(() => functionResult)
        await examinfoController.addMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addMajor).toHaveBeenCalledWith(mockRequest.body.name);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '전공 등록 완료' });
    })

    test('Unit Test / Controller / Examinfo - Major / addMajor : Failed', async () => {
        mockRequest.body = { name: '컴퓨터공학' };
        const functionResult = false;
        mockExaminfoService.addMajor = jest.fn(() => functionResult)
        await examinfoController.addMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.addMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.addMajor).toHaveBeenCalledWith(mockRequest.body.name);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '전공 등록 실패' });
    })

    test('Unit Test / Controller / Examinfo - Major / addMajor : failed / name = null', async () => {
        mockRequest.body = {};
        await examinfoController.addMajor(mockRequest, mockResponse);

        // 요청값 (name)을 안 넣었을 때 에러 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 요청값 (name)을 안 넣었을 때 에러 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' })
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Major / getMajors : Success', async () => {
        const returnValue = [
            {
                "major_id": 1,
                "name": "컴퓨터공학"
            },
            {
                "major_id": 2,
                "name": "간호학"
            },
        ]
    
        mockExaminfoService.getMajors = jest.fn(() => {
            return returnValue
        })

        await examinfoController.getMajors(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getMajors).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getMajors).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Examinfo - Major / getMajors : Failed', async () => {
        const returnValue = [];
    
        mockExaminfoService.getMajors = jest.fn(() => {
            return returnValue
        })

        await examinfoController.getMajors(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getMajors).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getMajors).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '전공 조회 실패' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Major / getOneMajor : Success', async () => {
        const requestParams = {
            major_id: 1
        }

        mockRequest.params = requestParams;

        const functionResult = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }
    
        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        })

        await examinfoController.getOneMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(requestParams.major_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: functionResult });
    })

    test('Unit Test / Controller / Examinfo - Major / getOneMajor : Failed', async () => {
        const requestParams = {
            major_id: 1
        }

        mockRequest.params = requestParams;

        const functionResult = null;
    
        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        })

        await examinfoController.getOneMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(requestParams.major_id)
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청한 전공 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Major / getOneMajor : Failed / major_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.getOneMajor(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Success', async () => {
        mockRequest.params = { major_id: 1 };
        mockRequest.body = { name: '컴퓨터공학' };

        const functionResult = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });

        const returnValue = true;
    
        mockExaminfoService.updateMajor = jest.fn(() => {
            return returnValue
        })

        await examinfoController.updateMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledWith(mockRequest.params.major_id, mockRequest.body.name);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '전공 수정 완료' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed', async () => {
        mockRequest.params = { major_id: 1 };
        mockRequest.body = { name: '컴퓨터공학' };

        const functionResult = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });

        const returnValue = false;
    
        mockExaminfoService.updateMajor = jest.fn(() => {
            return returnValue
        })

        await examinfoController.updateMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledWith(mockRequest.params.major_id, mockRequest.body.name);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '전공 수정 실패' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed / major_id = null', async () => {
        mockRequest.params = {};
        mockRequest.body = { name: '컴퓨터공학'}
        await examinfoController.updateMajor(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed / name = null', async () => {
        mockRequest.params = { major_id: 1 };
        mockRequest.body = {};
        await examinfoController.updateMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed / getOneMajor = null', async () => {
        mockRequest.params = { major_id: 1 };
        mockRequest.body = { name: '컴퓨터공학'}
        const functionResult = null
        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });
        await examinfoController.updateMajor(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청한 전공 조회 실패' });
    })

    // --------------------------

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Success', async () => {
        mockRequest.params = { major_id: 1 };

        const functionResult = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });

        const returnValue = true
    
        mockExaminfoService.dropMajor = jest.fn(() => {
            return returnValue;
        })

        await examinfoController.dropMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '전공 삭제 완료' });
    })

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Failed', async () => {
        mockRequest.params = { major_id: 1 };

        const functionResult = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });

        const returnValue = false;
    
        mockExaminfoService.dropMajor = jest.fn(() => {
            return returnValue;
        })

        await examinfoController.dropMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '전공 삭제 실패' });
    })

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Failed / major_id = null', async () => {
        mockRequest.params = {};
        await examinfoController.dropMajor(mockRequest, mockResponse);
        
        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Failed / getOneMajor = null', async () => {
        mockRequest.params = { major_id: 1 };

        const functionResult = null

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return functionResult
        });

        await examinfoController.dropMajor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(mockRequest.params.major_id);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청한 전공 조회 실패' });
    })
})