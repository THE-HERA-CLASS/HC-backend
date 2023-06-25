const UserController = require('../../controllers/user.controller.js');

let mockUserService = {
    emailExists: jest.fn(),
    nicknameExists: jest.fn(),
    signup: jest.fn(),
    withdrawal: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    findPassword: jest.fn(),
    findEmail: jest.fn(),
}

let mockRequest = {
    body: jest.fn(),
}

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
}

let userController = new UserController();

userController.userService = mockUserService;

describe('Unit Test / Controller / User', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    // basic form
    // test('Unit Test / Controller / User / ', async () => {
        
    // })

    test('Unit Test / Controller / User / emailExists : Success', async () => {
        const requestParams = { email: 'bestClient@gmail.com' }
        mockRequest.params = requestParams;
        const emailExistsData = 0;
        mockUserService.emailExists = jest.fn(() => emailExistsData);
        const returnValue = {msg: '이메일 사용 가능'}
        await userController.emailExists(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.emailExists).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.emailExists).toHaveBeenCalledWith(requestParams.email);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / emailExists : Failed', async () => {
        const requestParams = { email: 'bestClient@gmail.com' }
        mockRequest.params = requestParams;
        const emailExistsData = 1;
        mockUserService.emailExists = jest.fn(() => emailExistsData);
        const returnValue = {errMsg: '이메일 사용 불가능'}
        await userController.emailExists(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.emailExists).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.emailExists).toHaveBeenCalledWith(requestParams.email);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });
});