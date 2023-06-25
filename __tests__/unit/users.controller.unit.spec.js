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

    test('Unit Test / Controller / User / signup : Failed / nickname = null', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: null,
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '값 없음 : nickname' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / password = null', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: null,
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '값 없음 : password' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / major_id = null', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: null
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '값 없음 : major_id' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / email error', async () => {
        const requestBody = {
            email: 'bestClientgmail.com',
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '형식 에러: 올바른 이메일 형식이 아닙니다' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / nickname error', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'best가나다라!!! ',
            password: 'QWer1234!!',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '형식 에러: 닉네임은 2~10자의 영문, 한글, 숫자, 밑줄(_)만 허용됩니다' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / signup : Failed / password error', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: 'qwer1234',
            image: 'https://image.com',
            major_id: 1
        }
        mockRequest.body = requestBody;
        const returnValue = { errMsg: '형식 에러: 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함한 8~15자여야 합니다' }
        mockUserService.signup = jest.fn(() => returnValue);
        await userController.signup(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
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
        mockResponse.locals.user = {};
        const returnValue = {errMsg: '값 없음 : user_id'}
        mockUserService.withdrawal = jest.fn(() => returnValue);
        await userController.withdrawal(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / getProfile : Success', async () => {
        const user_id = 1;
        mockResponse.locals.user = { user_id };
        const getProfileData = {
            user_id : 1,
            email : 'bestClient@gmail.com',
            nickname : 'bestClient',
            image : 'https://image.com',
            authority : 'C',
            major_id : 10,
            createdAt : new Date(),
            updatedAt : new Date(),
        }
        const returnValue = { data: getProfileData };
        mockUserService.getProfile = jest.fn(() => getProfileData);
        await userController.getProfile(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.getProfile).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.getProfile).toHaveBeenCalledWith(user_id);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / getProfile : Failed / user_id = null', async () => {
        mockResponse.locals.user = {};
        const returnValue = {errMsg: '값 없음 : user_id'}
        mockUserService.withdrawal = jest.fn(() => returnValue);
        await userController.withdrawal(mockRequest, mockResponse);

        // 1. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 2. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / getProfile : Failed / not User', async () => {
        const user_id = 1;
        mockResponse.locals.user = { user_id };
        const getProfileData = 0
        const returnValue = { errMsg: '회원정보 조회 실패' };
        mockUserService.getProfile = jest.fn(() => getProfileData);
        await userController.getProfile(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.getProfile).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.getProfile).toHaveBeenCalledWith(user_id);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / updateProfile : Success', async () => {
        const user_id = 1;
        mockResponse.locals.user = { user_id };
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            authority: 'A',
            major_id: 1,
        }
        mockRequest.body = requestBody;
        const userData = {
            user_id: user_id,
            email: requestBody.email,
            nickname: requestBody.nickname,
            password: requestBody.password,
            image: requestBody.image,
            authority: requestBody.authority,
            major_id: requestBody.major_id,
        }
        const updateProfileResult = 1;
        const returnValue = { msg: '회원정보 수정 완료' };
        mockUserService.updateProfile = jest.fn(() => updateProfileResult);
        await userController.updateProfile(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.updateProfile).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.updateProfile).toHaveBeenCalledWith(userData);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / updateProfile : Failed', async () => {
        const user_id = 1;
        mockResponse.locals.user = { user_id };
        const requestBody = {
            email: 'bestClient@gmail.com',
            nickname: 'bestClient',
            password: 'QWer1234!!',
            image: 'https://image.com',
            authority: 'A',
            major_id: 1,
        }
        mockRequest.body = requestBody;
        const userData = {
            user_id: user_id,
            email: requestBody.email,
            nickname: requestBody.nickname,
            password: requestBody.password,
            image: requestBody.image,
            authority: requestBody.authority,
            major_id: requestBody.major_id,
        }
        const updateProfileResult = 0;
        const returnValue = { errMsg: '회원정보 수정 실패' };
        mockUserService.updateProfile = jest.fn(() => updateProfileResult);
        await userController.updateProfile(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.updateProfile).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.updateProfile).toHaveBeenCalledWith(userData);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / findPassword : Success', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
        }
        mockRequest.body = requestBody;
        const findPasswordResult = { password: 'QWer1234!!'}
        const returnValue = { data: findPasswordResult };
        mockUserService.findPassword = jest.fn(() => findPasswordResult);
        await userController.findPassword(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.findPassword).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.findPassword).toHaveBeenCalledWith(requestBody.email);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / findPassword : Failed', async () => {
        const requestBody = {
            email: 'bestClient@gmail.com',
        }
        mockRequest.body = requestBody;
        const findPasswordResult = null;
        const returnValue = { errMsg: '해당 이메일로 가입된 회원이 없습니다.' };
        mockUserService.findPassword = jest.fn(() => findPasswordResult);
        await userController.findPassword(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.findPassword).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.findPassword).toHaveBeenCalledWith(requestBody.email);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    // --------------------------

    test('Unit Test / Controller / User / findEmail : Success', async () => {
        const requestBody = {
            nickname: 'bestClient',
        }
        mockRequest.body = requestBody;
        const findEmailResult = { email: 'bestClient@gmail.com'}
        const returnValue = { data: findEmailResult };
        mockUserService.findEmail = jest.fn(() => findEmailResult);
        await userController.findEmail(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.findEmail).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.findEmail).toHaveBeenCalledWith(requestBody.nickname);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });

    test('Unit Test / Controller / User / findEmail : Failed', async () => {
        const requestBody = {
            nickname: 'bestClient',
        }
        mockRequest.body = requestBody;
        const findEmailResult = null;
        const returnValue = { errMsg: '해당 닉네임으로 가입된 회원이 없습니다.' };
        mockUserService.findEmail = jest.fn(() => findEmailResult);
        await userController.findEmail(mockRequest, mockResponse);

        // 1. 메서드 호출 1번만 하는가?
        expect(mockUserService.findEmail).toHaveBeenCalledTimes(1);
        // 2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
        expect(mockUserService.findEmail).toHaveBeenCalledWith(requestBody.nickname);
        // 3. 응답 상태값이 맞는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 4. 응답 값이 맞는가?
        expect(mockResponse.json).toHaveBeenCalledWith(returnValue);
    });
});