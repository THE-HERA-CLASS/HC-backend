const QuestionController = require('../../controllers/question.controller.js');

let mockQuestionService = {
    addQuestionsWord: jest.fn(),
    addQuestionsEditor: jest.fn(),
    addQuestion: jest.fn(),
    getQuestions: jest.fn(),
    getQuestionWithQuestionId: jest.fn(),
    getQuestionWithExamId: jest.fn(),
    updateQuestion: jest.fn(),
    deleteQuestion: jest.fn(),
}

let mockRequest = {
    body: jest.fn(),
}

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    locals: jest.fn(),
}

let questionController = new QuestionController();

questionController.questionService = mockQuestionService;

describe('Unit Test / Controller / Question', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    // test('Unit Test / Controller / Question / addQuestionsWord : Success', async () => {
    //     mockRequest.body = { exam_id: 1 }
    //     mockRequest.file = { file: 'test.docx'}
    //     const exam_id = mockRequest.body.exam_id;
    //     const question_array = ['1', '2'];
    //     const returnValue = { result: { addQuestionData: 'data' }};
    //     mockQuestionService.addQuestionsWord = jest.fn(() => reuturnValue);
    //     await questionController.addQuestion(mockRequest, mockResponse);

    //     // 해당 메서드 실행을 정상적으로 1번 하는가?
    //     expect(mockQuestionService.addQuestionsWord).toHaveBeenCalledTimes(1);
    //     // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
    //     expect(mockQuestionService.addQuestionsWord).toHaveBeenCalledWith(exam_id, question_array);
    //     // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
    //     expect(mockResponse.status).toHaveBeenCalledWith(200);
    //     // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
    //     expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    // })

    // --------------------------

    test('Unit Test / Controller / Question / addQuestionsEditor : Success', async () => {
        mockRequest.body = { data: '테스트문구' };
        const returnValue = { addQuestionData: '테스트문구' };
        mockQuestionService.addQuestionsEditor = jest.fn(() => returnValue);
        await questionController.addQuestionsEditor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.addQuestionsEditor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.addQuestionsEditor).toHaveBeenCalledWith(mockRequest.body.data);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue.addQuestionData });
    })

    test('Unit Test / Controller / Question / addQuestionsEditor : Failed', async () => {
        mockRequest.body = { data: '테스트문구' };
        const returnValue = null
        mockQuestionService.addQuestionsEditor = jest.fn(() => returnValue);
        await questionController.addQuestionsEditor(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.addQuestionsEditor).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.addQuestionsEditor).toHaveBeenCalledWith(mockRequest.body.data);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '파싱 실패' });
    })

    test('Unit Test / Controller / Question / addQuestionsEditor : Failed / data = null', async () => {
        mockRequest.body = {};
        await questionController.addQuestionsEditor(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: data' });
    })

    // --------------------------

    test('Unit Test / Controller / Question / addQuestion : Success', async () => {
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        const questionData = {
            exam_id: mockRequest.body.exam_id,
            sort_num: mockRequest.body.sort_num,
            question_num: mockRequest.body.question_num,
            question: mockRequest.body.question,
            example: mockRequest.body.example,
            choice: mockRequest.body.choice,
            answer: mockRequest.body.answer,
            solve: mockRequest.body.solve,
          };
          const returnValue = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: '',
            choice: '',
            answer: '4',
            solve: '해설'
        };
          mockQuestionService.addQuestion = jest.fn(() => returnValue);
          await questionController.addQuestion(mockRequest, mockResponse);

          // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.addQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.addQuestion).toHaveBeenCalledWith(questionData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed', async () => {
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        const questionData = {
            exam_id: mockRequest.body.exam_id,
            sort_num: mockRequest.body.sort_num,
            question_num: mockRequest.body.question_num,
            question: mockRequest.body.question,
            example: mockRequest.body.example,
            choice: mockRequest.body.choice,
            answer: mockRequest.body.answer,
            solve: mockRequest.body.solve,
          };
          const returnValue = null;
          mockQuestionService.addQuestion = jest.fn(() => returnValue);
          await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.addQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.addQuestion).toHaveBeenCalledWith(questionData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '문제 등록 실패' });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed / exam_id = null', async () => {
        mockRequest.body = {
            exam_id: null,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: exam_id' });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed / sort_num = null', async () => {
        mockRequest.body = {
            exam_id: 1,
            sort_num: null,
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: sort_num' });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed / exam_id is not Number', async () => {
        mockRequest.body = {
            exam_id: '가',
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: exam_id 숫자만' });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed / sort_num is not Number', async () => {
        mockRequest.body = {
            exam_id: 1,
            sort_num: '가',
            question_num: 1,
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: sort_num 숫자만' });
    })

    test('Unit Test / Controller / Question / addQuestion : Failed / question_num is not Number', async () => {
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: '가',
            question: '문제',
            example: JSON.stringify(),
            choice: JSON.stringify(),
            answer: '4',
            solve: '해설'
        }
        await questionController.addQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: question_num 숫자만' });
    })

    // --------------------------

    test('Unit Test / Controller / Question / getQuestions : Success', async () => {
        const returnValue = [
            {
                question_id: 1,
                exam_id: 1,
            },
        ]
        mockQuestionService.getQuestions = jest.fn(() => returnValue);
        await questionController.getQuestions(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestions).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestions).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Question / getQuestions : Failed', async () => {
        const returnValue = []
        mockQuestionService.getQuestions = jest.fn(() => returnValue);
        await questionController.getQuestions(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestions).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestions).toHaveBeenCalledWith();
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '문제 없음' });
    })

    // --------------------------

    test('Unit Test / Controller / Question / getQuestionWithQuestionId : Success', async () => {
        mockRequest.params = { question_id: 1 };
        const returnValue = {
            question_id: 1,
            exam_id: 1,
        }
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => returnValue);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Question / getQuestionWithQuestionId : Failed', async () => {
        mockRequest.params = { question_id: 1 };
        const returnValue = null;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => returnValue);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '문제 없음' });
    })

    test('Unit Test / Controller / Question / getQuestionWithQuestionId : Failed / question_id = null', async () => {
        mockRequest.params = {};
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: question_id' });
    })

    test('Unit Test / Controller / Question / getQuestionWithQuestionId : Failed / question_id is not Number', async () => {
        mockRequest.params = { question_id: '가'};
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: question_id 숫자만' });
    })

    // --------------------------

    test('Unit Test / Controller / Question / getQuestionWithExamId : Success', async () => {
        mockRequest.params = { exam_id: 1 };
        const returnValue = {
            question_id: 1,
            exam_id: 1,
        }
        mockQuestionService.getQuestionWithExamId = jest.fn(() => returnValue);
        await questionController.getQuestionWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithExamId).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ data: returnValue });
    })

    test('Unit Test / Controller / Question / getQuestionWithExamId : Failed', async () => {
        mockRequest.params = { exam_id: 1 };
        const returnValue = null;
        mockQuestionService.getQuestionWithExamId = jest.fn(() => returnValue);
        await questionController.getQuestionWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithExamId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithExamId).toHaveBeenCalledWith(mockRequest.params.exam_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '문제 없음' });
    })

    test('Unit Test / Controller / Question / getQuestionWithExamId : Failed / exam_id = null', async () => {
        mockRequest.params = {};
        await questionController.getQuestionWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: exam_id' });
    })

    test('Unit Test / Controller / Question / getQuestionWithExamId : Failed / exam_id is not Number', async () => {
        mockRequest.params = { exam_id: '가'};
        await questionController.getQuestionWithExamId(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: exam_id 숫자만' });
    })

    // --------------------------

    test('Unit Test / Controller / Question / updateQuestion : Success', async () => {
        mockRequest.params = { question_id: 1 };
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: '',
            choice: '',
            answer: '1',
            solve: '해설'
        }
        const functionResult = true;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);

        
        const questionData = {
            question_id: mockRequest.params.question_id,
            exam_id: mockRequest.body.exam_id,
            sort_num: mockRequest.body.sort_num,
            question_num: mockRequest.body.question_num,
            question: mockRequest.body.question,
            example: mockRequest.body.example,
            choice: mockRequest.body.choice,
            answer: mockRequest.body.answer,
            solve: mockRequest.body.solve,
        }
        const returnValue = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: '',
            choice: '',
            answer: '1',
            solve: '해설'
        }

        mockQuestionService.updateQuestion = jest.fn(() => returnValue);
        await questionController.updateQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.updateQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.updateQuestion).toHaveBeenCalledWith(questionData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: `question_id: ${mockRequest.params.question_id} 문제 수정 완료`, data: returnValue });
    })

    test('Unit Test / Controller / Question / updateQuestion : Failed', async () => {
        mockRequest.params = { question_id: 1 };
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: '',
            choice: '',
            answer: '1',
            solve: '해설'
        }
        const functionResult = true;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);

        
        const questionData = {
            question_id: mockRequest.params.question_id,
            exam_id: mockRequest.body.exam_id,
            sort_num: mockRequest.body.sort_num,
            question_num: mockRequest.body.question_num,
            question: mockRequest.body.question,
            example: mockRequest.body.example,
            choice: mockRequest.body.choice,
            answer: mockRequest.body.answer,
            solve: mockRequest.body.solve,
        }
        const returnValue = null;

        mockQuestionService.updateQuestion = jest.fn(() => returnValue);
        await questionController.updateQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.updateQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.updateQuestion).toHaveBeenCalledWith(questionData);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: `question_id: ${mockRequest.params.question_id} 문제 수정 실패` });
    })

    test('Unit Test / Controller / Question / updateQuestion : Failed / question_id = null', async () => {
        mockRequest.params = {};
        await questionController.updateQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: question_id' });
    })

    test('Unit Test / Controller / Question / updateQuestion : Failed / question_id is not Number', async () => {
        mockRequest.params = { question_id: '가' };
        await questionController.updateQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: question_id 숫자만' });
    })

    test('Unit Test / Controller / Question / updateQuestion : Failed / no Question', async () => {
        mockRequest.params = { question_id: 1 };
        mockRequest.body = {
            exam_id: 1,
            sort_num: 1,
            question_num: 1,
            question: '문제',
            example: '',
            choice: '',
            answer: '1',
            solve: '해설'
        }
        const functionResult = false;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.updateQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        expect(mockQuestionService.updateQuestion).toHaveBeenCalledTimes(0);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: `question_id: ${mockRequest.params.question_id} 문제 없음` });
    })

    // --------------------------

    test('Unit Test / Controller / Question / deleteQuestion : Success', async () => {
        mockRequest.params = { question_id: 1 };
        const functionResult = true;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);

        const returnValue = true;
        mockQuestionService.deleteQuestion = jest.fn(() => returnValue);
        await questionController.deleteQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.deleteQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.deleteQuestion).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ msg: `question_id:${mockRequest.params.question_id} 문제 삭제 완료` });
    })

    test('Unit Test / Controller / Question / deleteQuestion : Failed', async () => {
        mockRequest.params = { question_id: 1 };
        const functionResult = true;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.getQuestionWithQuestionId(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);

        const returnValue = false;
        mockQuestionService.deleteQuestion = jest.fn(() => returnValue);
        await questionController.deleteQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.deleteQuestion).toHaveBeenCalledTimes(1);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.deleteQuestion).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(419);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: `question_id: ${mockRequest.params.question_id} 문제 삭제 실패` });
    })

    test('Unit Test / Controller / Question / deleteQuestion : Failed / question_id = null', async () => {
        mockRequest.params = {};
        await questionController.deleteQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(411);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '값 없음: question_id' });
    })

    test('Unit Test / Controller / Question / deleteQuestion : Failed / question_id is not Number', async () => {
        mockRequest.params = { question_id: '가' };
        await questionController.deleteQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(412);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: '형식 에러: question_id 숫자만' });
    })

    test('Unit Test / Controller / Question / deleteQuestion : Failed / no Question', async () => {
        mockRequest.params = { question_id: 1 };
        const functionResult = false;
        mockQuestionService.getQuestionWithQuestionId = jest.fn(() => functionResult);
        await questionController.deleteQuestion(mockRequest, mockResponse);

        // 해당 메서드 실행을 정상적으로 1번 하는가?
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledTimes(1);
        expect(mockQuestionService.deleteQuestion).toHaveBeenCalledTimes(0);
        // 해당 메서드 매개변수에 정상적으로 담아서 요청하는가
        expect(mockQuestionService.getQuestionWithQuestionId).toHaveBeenCalledWith(mockRequest.params.question_id);
        // 해당 메서드 실행 후 상태값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.status).toHaveBeenCalledWith(416);
        // 해당 메서드 실행 후 응답값이 우리가 예상한대로 잘 나오는가?
        expect(mockResponse.json).toHaveBeenCalledWith({ errMsg: `question_id: ${mockRequest.params.question_id} 문제 없음` });
    })
})
