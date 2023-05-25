const ExamRepository = require('../repositories/exam.repository.js');

class ExamService {
  examRepository = new ExamRepository();

  addQuestion = async (exam_id, question_array) => {
    const clearText = (item) => {
      const result = item
        .replace(/^<br><br>|<br><br>$/g, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/<br><br>/g, '\n');
      return result;
    };

    let question_result = [];
    let question_object = {};

    question_array.forEach((item, index) => {
      const dot_index = item.indexOf('. ');
      const billiard_index = item.indexOf('※ ');
      if (dot_index > 0) {
        // 문제유형
        const sort_num = index + 1;
        const question_num = Number(item.substring(0, dot_index));
        const other = item.substring(dot_index + 1, item.length);
        const example_start_index = other.indexOf('<br><br><br><br>');
        const choice_1_index = other.indexOf('①');
        const choice_2_index = other.indexOf('②');
        const choice_3_index = other.indexOf('③');
        const choice_4_index = other.indexOf('④');
        const answer_start_index = other.indexOf('--정답');
        const solve_start_index = other.indexOf('--해설');
        const other_end_index = other.length;

        if (example_start_index > 0) {
          // 보기문 있는 유형
          let question_value = other.substring(dot_index, example_start_index);
          question_value = clearText(question_value);
          const example_init = other
            .substring(example_start_index, choice_1_index)
            .split('<br><br><br><br>');
          example_init.pop(); // 배열 맨뒤 공백칸 제거
          example_init.shift(); // 배열 맨앞 공백칸 제거
          const example_array = example_init.map((row) => {
            const clearRow = clearText(row);
            return { type: 'text', value: clearRow };
          });
          let choice_1_value = other.substring(choice_1_index + 1, choice_2_index);
          choice_1_value = clearText(choice_1_value);
          let choice_2_value = other.substring(choice_2_index + 1, choice_3_index);
          choice_2_value = clearText(choice_2_value);
          let choice_3_value = other.substring(choice_3_index + 1, choice_4_index);
          choice_3_value = clearText(choice_3_value);
          let choice_4_value = other.substring(choice_4_index + 1, answer_start_index);
          choice_4_value = clearText(choice_4_value);
          const choice_array = [
            { type: 'text', value: choice_1_value },
            { type: 'text', value: choice_2_value },
            { type: 'text', value: choice_3_value },
            { type: 'text', value: choice_4_value },
          ];
          let answer_value = other.substring(answer_start_index + 5, solve_start_index);
          answer_value = clearText(answer_value);
          let solve_value = other.substring(solve_start_index + 4, other_end_index);
          solve_value = clearText(solve_value);
          question_object = {
            sort_num,
            question_num,
            question: question_value,
            example: example_array,
            choice: choice_array,
            answer: answer_value,
            solve: solve_value,
          };
        } else {
          // 보기문 없는 유형
          let question_value = other.substring(dot_index, choice_1_index);
          question_value = clearText(question_value);
          let choice_1_value = other.substring(choice_1_index + 1, choice_2_index);
          choice_1_value = clearText(choice_1_value);
          let choice_2_value = other.substring(choice_2_index + 1, choice_3_index);
          choice_2_value = clearText(choice_2_value);
          let choice_3_value = other.substring(choice_3_index + 1, choice_4_index);
          choice_3_value = clearText(choice_3_value);
          let choice_4_value = other.substring(choice_4_index + 1, answer_start_index);
          choice_4_value = clearText(choice_4_value);
          const choice_array = [
            { type: 'text', value: choice_1_value },
            { type: 'text', value: choice_2_value },
            { type: 'text', value: choice_3_value },
            { type: 'text', value: choice_4_value },
          ];
          let answer_value = other.substring(answer_start_index + 5, solve_start_index);
          answer_value = clearText(answer_value);
          let solve_value = other.substring(solve_start_index + 4, other_end_index);
          solve_value = clearText(solve_value);
          question_object = {
            sort_num,
            question_num,
            question: question_value,
            choice: choice_array,
            answer: answer_value,
            solve: solve_value,
          };
        }

        question_result.push(question_object);
      } else if (billiard_index === 0) {
        // 알림유형
        const sort_num = index + 1;
        const other = item.substring(billiard_index + 2, item.length);
        question_object = {
          sort_num,
          question: other,
        };
        question_result.push(question_object);
      }
    });
    // await this.examRepository.addQuestion(exam_id, question_result);
    return question_result;
  };
}

module.exports = ExamService;
