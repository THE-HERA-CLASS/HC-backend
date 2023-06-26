

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