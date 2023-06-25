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
        const addMajorRequestBody = {
            name: 'request name'
        }

        mockRequest.body = addMajorRequestBody;

        const addMajorReturnValue = { msg: '전공 등록 완료' }

        mockExaminfoService.addMajor = jest.fn(() => {
            return addMajorReturnValue
        })

        await examinfoController.addMajor(mockRequest, mockResponse);

        // 1. Request body 데이터가 저상적으로 addMajor에 전달되는가?
        expect(mockExaminfoService.addMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.addMajor).toHaveBeenCalledWith(addMajorRequestBody.name);

        // 2-1. mockResponse.json 결과값이 우리가 의도한 대로 잘 나오냐?
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: '전공 등록 완료'});

        // 3. mockResponse.status 200이 맞냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    })

    test('Unit Test / Controller / Examinfo - Major / addMajor : failed : name null', async () => {
        mockRequest.body = {};

        await examinfoController.addMajor(mockRequest, mockResponse);

        // 1. 요청 상태값이 400이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(411);

        // 2. 에러문구가 우리가 예상하는게 맞냐?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' })
    })

    test('Unit Test / Controller / Examinfo - Major / getMajors : Success', async () => {
        const getMajorsReturnValues = [
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
            return getMajorsReturnValues
        })

        await examinfoController.getMajors(mockRequest, mockResponse);

        // 1. 서비스쪽에 getMajors 메서드 요청 1번만 하느냐?
        expect(mockExaminfoService.getMajors).toHaveBeenCalledTimes(1);

        // 2. 최종 상태값이 200이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        // 3. 너가 예상하는 결과대로 나오냐?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: getMajorsReturnValues });
    })

    test('Unit Test / Controller / Examinfo - Major / getOneMajor : Success', async () => {
        const getOneMajorRequestParams = {
            major_id: 1
        }

        mockRequest.params = getOneMajorRequestParams;

        const getOneMajorReturnValue = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }
    
        mockExaminfoService.getOneMajor = jest.fn(() => {
            return getOneMajorReturnValue
        })

        await examinfoController.getOneMajor(mockRequest, mockResponse);

        // 1. 서비스쪽에 getOneMajor 메서드 요청 1번만 하느냐? major_id를 잘 전달하느냐?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(getOneMajorRequestParams.major_id);

        // 2. 최종 상태값이 200이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        // 3. 너가 예상하는 결과대로 나오냐?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: getOneMajorReturnValue });
    })

    test('Unit Test / Controller / Examinfo - Major / getOneMajor : Failed : major_id = null', async () => {
        mockRequest.params = {};

        await examinfoController.getOneMajor(mockRequest, mockResponse);

        // 1. 요청 상태값이 411이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(411);

        // 2. 에러문구가 우리가 예상하는게 맞냐?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' })
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Success', async () => {
        const updateMajorRequestParams = {
            major_id: 1,
        };

        const updatemajorRequestBody = {
            name: '컴퓨터공학'
        }

        mockRequest.params = updateMajorRequestParams;
        mockRequest.body = updatemajorRequestBody;

        const getOneMajorReturnValue = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return getOneMajorReturnValue
        });

        const updateMajorReturnValue = { msg: '전공 수정 완료' };
    
        mockExaminfoService.updateMajor = jest.fn(() => {
            return updateMajorReturnValue
        })

        await examinfoController.updateMajor(mockRequest, mockResponse);

        // 0. getOneMajor 1번 호출?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(updateMajorRequestParams.major_id);

        // 1. 서비스쪽에 메서드 요청 1번만 하느냐? major_id를 잘 전달하느냐?
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.updateMajor).toHaveBeenCalledWith(updateMajorRequestParams.major_id, updatemajorRequestBody.name);

        // 2. 최종 상태값이 200이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        // 3. 너가 예상하는 결과대로 나오냐?
        expect(mockResponse.json).toHaveBeenCalledWith(updateMajorReturnValue);
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed : major_id = null', async () => {
        mockRequest.params = {};
        mockRequest.body = { name: '컴퓨터공학'}
        await examinfoController.updateMajor(mockRequest, mockResponse);
        // 1번 호출하는게 맞냐?, 상태코드가 416이냐?, json에 errMsg가 잘 담겨있냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: major_id' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed : name = null', async () => {
        mockRequest.params = {major_id: 1};
        mockRequest.body = {};
        await examinfoController.updateMajor(mockRequest, mockResponse);
        // 1번 호출하는게 맞냐?, 상태코드가 416이냐?, json에 errMsg가 잘 담겨있냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: name' });
    })

    test('Unit Test / Controller / Examinfo - Major / updateMajor : Failed : getOneMajor = null', async () => {
        mockRequest.params = {major_id: 1};
        mockRequest.body = { name: '컴퓨터공학'}
        const getOneMajorReturnValue = 0
        mockExaminfoService.getOneMajor = jest.fn(() => {
            return getOneMajorReturnValue
        });
        await examinfoController.updateMajor(mockRequest, mockResponse);
        // 1번 호출하는게 맞냐?, 상태코드가 416이냐?, json에 errMsg가 잘 담겨있냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청한 전공 조회 실패' });
    })

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Success', async () => {
        const dropMajorRequestParams = {
            major_id: 1
        };

        mockRequest.params = dropMajorRequestParams;

        const getOneMajorReturnValue = {
            "major_id": 1,
            "name": "컴퓨터공학"
        }

        mockExaminfoService.getOneMajor = jest.fn(() => {
            return getOneMajorReturnValue
        });

        const dropMajorReturnValue = { msg: '전공 삭제 완료' };
    
        mockExaminfoService.dropMajor = jest.fn(() => {
            return dropMajorReturnValue
        })

        await examinfoController.dropMajor(mockRequest, mockResponse);

        // 0. getOneMajor 1번 호출?
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.getOneMajor).toHaveBeenCalledWith(dropMajorRequestParams.major_id);

        // 1. 서비스쪽에 메서드 요청 1번만 하느냐? major_id를 잘 전달하느냐?
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledTimes(1);
        expect(mockExaminfoService.dropMajor).toHaveBeenCalledWith(dropMajorRequestParams.major_id);

        // 2. 최종 상태값이 200이냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        // 3. 너가 예상하는 결과대로 나오냐?
        expect(mockResponse.json).toHaveBeenCalledWith(dropMajorReturnValue);
    })

    test('Unit Test / Controller / Examinfo - Major / dropMajor : Failed getOneMajor = null', async () => {
        mockRequest.params = {};
        await examinfoController.dropMajor(mockRequest, mockResponse);
        // 1번 호출하는게 맞냐?, 상태코드가 416이냐?, json에 errMsg가 잘 담겨있냐?
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '요청한 전공 조회 실패' });
    })

})