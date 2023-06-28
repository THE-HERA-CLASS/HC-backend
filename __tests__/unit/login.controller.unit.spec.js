const LoginController = require('../../controllers/login.controller');

// 가짜 LoginService
let mockLoginService = {
  login: jest.fn(),
  logout: jest.fn(),
};
// 가짜 UserService
let mockUserService = {
  emailExists: jest.fn(),
};
// 가짜 요청
let mockRequest = {
  body: jest.fn(),
};
// 가짜 응답
let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  locals: jest.fn(),
  cookie: jest.fn(),
  clearCookie: jest.fn(),
};

let loginController = new LoginController();

loginController.loginService = mockLoginService;
loginController.userService = mockUserService;

// 로그인 컨트롤러 계층 유닛 테스트
describe('Login Controller Unit Test', () => {
  // 각 test가 실행되기 전에 실행된다
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 mock 객체 초기화

    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
    mockResponse.clearCookie = jest.fn();
  });

  // login test
  test('Unit Test / Controller / login / login : Success', async () => {
    const requestEmail = 'test@gmail.com';
    const requestPassword = 'testpassword';
    mockRequest.body = { email: requestEmail, password: requestPassword };
    const getUserDataReturnValue = {
      user_id: 1,
      nickname: 'testNickname',
      email: 'test@gmail.com',
      major_id: 1,
      authority: 'C',
      image: 'https://test.image.com',
      password: 'testpassword',
    };
    const loginReturnValue = ['TestAccessToken', 'TestRefreshToken'];
    mockUserService.emailExists = jest.fn(() => {
      return getUserDataReturnValue;
    });

    mockLoginService.login = jest.fn(() => {
      return loginReturnValue;
    });

    await loginController.login(mockRequest, mockResponse);

    // 1-1. Request body 데이터가 제대로 emailExists에 전달되는가?
    expect(mockUserService.emailExists).toHaveBeenCalledTimes(1);
    // 1-2. 메서드 호출 시, 매개변수는 잘 담아서 보내고 있는가?
    expect(mockUserService.emailExists).toHaveBeenCalledWith(requestEmail);

    // 2-1. login 메서드가 호출되는가?
    expect(mockLoginService.login).toHaveBeenCalledTimes(1);
    // 2-2. login 메서드가 특정 인자(getUserDataReturnValue)와 함께 호출되었는가?
    expect(mockLoginService.login).toHaveBeenCalledWith(getUserDataReturnValue);

    // 3-1. 상태값과 응답 값은 맞는가?
    // 로그인시 cookie에는 accesstoken이 담기기 때문에 cookie도 mock
    expect(mockResponse.cookie).toHaveBeenCalledWith('accesstoken', `Bearer ${loginReturnValue[0]}`);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ accesstoken: loginReturnValue[0] });
  });
  // email = null 실패케이스
  test('Unit Test / Controller / login / login : Failed / email = null', async () => {
    mockRequest.body = { email: '', password: 'testpassword' };
    await loginController.login(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: 이메일/패스워드' });
  });
  // password = null 실패케이스
  test('Unit Test / Controller / login / login : Failed / password = null', async () => {
    mockRequest.body = { email: 'test@gmail.com', password: '' };
    await loginController.login(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(411);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: 이메일/패스워드' });
  });

  // getUserData = null 실패케이스 (email과 password가 가입된 회원정보에 없을 때 )
  test('Unit Test / Controller / login / login : Failed / getUserData = null', async () => {
    const requestEmail = 'test@hamil.com';
    const requestPassword = 'testpassword';
    mockRequest.body = { email: requestEmail, password: requestPassword };

    mockUserService.emailExists = jest.fn(() => null);

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(419);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '등록되지 않은 사용자' });
  });

  // 서버 오류
  test('login Unit Test: Server error', async () => {
    const requestEmail = 'test@gmail.com';
    const requestPassword = 'testpassword';
    mockRequest.body = { email: requestEmail, password: requestPassword };

    mockUserService.emailExists = jest.fn(() => {
      throw new Error('Server error');
    });

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '로그인 실패' });
  });

  // 로그아웃
  test('logout Unit Test: Success', async () => {
    const ResponseUser_id = 1; // 사용자 ID를 선언합니다.
    mockResponse.locals = { user: { user_id: ResponseUser_id } };

    mockLoginService.logout = jest.fn(() => 1); // 로그아웃이 성공적으로 이루어짐을 나타냅니다.

    await loginController.logout(mockRequest, mockResponse);

    // 1. 로그아웃 메서드가 호출되는가?
    expect(mockLoginService.logout).toHaveBeenCalledTimes(1);

    // 2. 로그아웃 메서드가 특정 인자(ResponseUser_id)와 함께 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledWith(ResponseUser_id);

    // 3. 로그아웃 성공했을 때, accesstoken 쿠키가 제거되는가?
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('accesstoken');

    // 4. 상태 코드와 응답 메세지는 맞는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그아웃 완료' });
  });

  // 로그아웃 실패
  test('Unit Test / Controller / login / logout : Failed', async () => {
    const ResponseUser_id = 1;
    mockResponse.locals = { user: { user_id: ResponseUser_id } };
    mockLoginService.logout = jest.fn(() => 0); // 로그아웃 실패
    await loginController.logout(mockRequest, mockResponse);

    // 1. 로그아웃 메서드가 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledTimes(1);
    // 2. 로그아웃 메서드가 특정 인자(ResponseUser_id)와 함께 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledWith(ResponseUser_id);
    // 3. 로그아웃 실패했을 때, 419 상태 코드와 실패 메세지가 응답되는가?
    expect(mockResponse.status).toHaveBeenCalledWith(419);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그아웃 실패' });
    // 4. accesstoken 쿠키가 제거되지 않는가?
    expect(mockResponse.clearCookie).not.toHaveBeenCalled();
  });

  // 로그아웃 서버 오류
  test('Unit Test / Controller / login / server error', async () => {
    const ResponseUser_id = 1;
    mockResponse.locals = { user: { user_id: ResponseUser_id } };
    mockLoginService.logout = jest.fn(() => {
      throw new Error('로그아웃 오류');
    }); // 로그아웃 오류
    console.error = jest.fn(); // console.error 함수 모킹
    await loginController.logout(mockRequest, mockResponse);

    // 1. 로그아웃 메서드가 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledTimes(1);
    // 2. 로그아웃 메서드가 특정 인자(ResponseUser_id)와 함께 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledWith(ResponseUser_id);
    // 3. 로그아웃 오류 발생 시, 400 상태 코드와 오류 메세지가 응답되는가?
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그아웃 실패' });
    // 4. 오류가 콘솔에 출력되는가?
    expect(console.error).toHaveBeenCalledWith(new Error('로그아웃 오류'));
  });

});
