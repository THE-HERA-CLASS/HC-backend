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
    locals: jest.fn(),
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

    test('Unit Test / Controller / User / emailExists : Failed / Request.email = null', async () => {
        mockRequest.params = {};
        const returnValue = {errMsg: '값 없음 : email'}
        await userController.emailExists(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / nicknameExists : Success', async () => {
        const requestParams = { nickname: 'bestClient' }
        mockRequest.params = requestParams;
        const nicknameExistsData = 0;
        mockUserService.nicknameExists = jest.fn(() => nicknameExistsData);
        const returnValue = {msg: '닉네임 사용 가능'}
        await userController.nicknameExists(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.nicknameExists).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.nicknameExists).toHaveBeenCalledWith(requestParams.nickname);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / nicknameExists : Failed', async () => {
        const requestParams = { nickname: 'bestClient' }
        mockRequest.params = requestParams;
        const nicknameExistsData = 1;
        mockUserService.nicknameExists = jest.fn(() => nicknameExistsData);
        const returnValue = {errMsg: '닉네임 사용 불가능'}
        await userController.nicknameExists(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.nicknameExists).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.nicknameExists).toHaveBeenCalledWith(requestParams.nickname);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / nicknameExists : Failed / Request.nickname = null', async () => {
        mockRequest.params = {};
        const returnValue = {errMsg: '값 없음 : nickname'}
        await userController.nicknameExists(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / signup : Success', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = {msg: '회원가입 완료'}
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.signup).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.signup).toHaveBeenCalledWith(requestBody);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / email = null', async () => {
        const requestBody = {
            email: null,
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '값 없음 : email' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / withdrawal : Success', async () => {
        const user_id = 1;
        mockResponse.locals.user = { user_id };
        const returnValue = {msg: '회원탈퇴 완료'}
        mockUserService.withdrawal = jest.fn(() => returnValue);
        await userController.withdrawal(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.withdrawal).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.withdrawal).toHaveBeenCalledWith(user_id);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / withdrawal : Failed / user_id = null', async () => {
        const user_id = 1;
        mockResponse.locals.user = {};
        const returnValue = {errMsg: '값 없음 : user_id'}
        mockUserService.withdrawal = jest.fn(() => returnValue);
        await userController.withdrawal(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });
});