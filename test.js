test('logout Unit Test: Success', async () => {
    const mockUser_id = 1;
    mockResponse.locals = { user: { user_id: mockUserId } };
    const logoutReturnValue = 1;

    mockLoginService.logout = jest.fn(() => {
        return Promise.resolve(logoutReturnValue);
    });

    await loginController.logout(mockRequest, mockResponse);

    // 1-1. logout 메서드가 호출되는가?
    expect(mockLoginService.logout).toHaveBeenCalledTimes(1);
    // 1-2. logout 메서드가 특정 인자(mockUserId)와 함께 호출되었는가?
    expect(mockLoginService.logout).toHaveBeenCalledWith(mockUser_id);

    // 2-1. cookie가 제대로 지워졌는가?
    expect(mockResponse.clearCookie).toHaveBeenCalledWith('accesstoken');

    // 3-1. 상태 값과 응답 값은 맞는가?
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: '로그아웃 완료' });
});
