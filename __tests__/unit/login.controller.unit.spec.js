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
  });

  test('login Unit Test: Success', async () => {
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
    const loginReturnValue = ['TestAccessToken'];
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
    expect(mockResponse.cookie).toHaveBeenCalledWith('accesstoken', `Bearer ${loginReturnValue}`);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ accesstoken: `${loginReturnValue}` });
  });
});
