const ExamRepository = require('../repositories/exam.repository.js');

class ExamService {
  examRepository = new ExamRepository();

  addQuestions = async (exam_id, question_array) => {
    const clearText = (item) => item.replace(/^\s+|\s+$/g, '');

    let question_datas = [];
    let question_object = {};

    question_array.forEach((item, index) => {
      const sort_num = index + 1;
      const dot_index = item.indexOf('. ');
      const billiard_index = item.indexOf('※ ');

      if (dot_index > billiard_index) {
        // 문제유형
        const question_num = Number(item.substring(0, dot_index));
        const other = item.substring(dot_index + 1, item.length);
        const example_start_index = item.indexOf('--보기문');
        const choice_1_index = other.indexOf('①');
        const choice_2_index = other.indexOf('②');
        const choice_3_index = other.indexOf('③');
        const choice_4_index = other.indexOf('④');
        const answer_start_index = other.indexOf('--정답');
        const solve_start_index = other.indexOf('--해설');
        const other_end_index = other.length;

        if (example_start_index < 0) {
          // 보기문 없는 유형
          const question_value = clearText(other.substring(0, choice_1_index));
          const choice_1_value = clearText(other.substring(choice_1_index + 1, choice_2_index));
          const choice_2_value = clearText(other.substring(choice_2_index + 1, choice_3_index));
          const choice_3_value = clearText(other.substring(choice_3_index + 1, choice_4_index));
          const choice_4_value = clearText(other.substring(choice_4_index + 1, answer_start_index));
          const answer_value = clearText(other.substring(answer_start_index + 4, solve_start_index));
          const solve_value = clearText(other.substring(solve_start_index + 4, other_end_index));
          const choice_array = [
            { option: '1', type: 'text', value: choice_1_value },
            { option: '2', type: 'text', value: choice_2_value },
            { option: '3', type: 'text', value: choice_3_value },
            { option: '4', type: 'text', value: choice_4_value },
          ];
          question_object = {
            sort_num,
            question_num,
            question: question_value,
            choice: choice_array,
            answer: answer_value,
            solve: solve_value,
          };
          question_datas.push(question_object);
        } else if (example_start_index > 0) {
          // 보기문 있는 유형
          const question_value = clearText(other.substring(dot_index, example_start_index - 4));
          const example_init = clearText(other.substring(example_start_index + 4, choice_1_index));
          const example_init_array = example_init.split('--보기문');
          const example_edit_array = example_init_array.map((item) => item.trim());

          const example_value_array = example_edit_array.map((item) => {
            if (item.indexOf('<img') === 0) {
              const img_src_start_index = item.indexOf('base64,') + 7;
              const img_src_end_index = item.indexOf('" />');
              const img_extension_start_index = item.indexOf('data:image/') + 11;
              const img_extension = item.substring(img_extension_start_index, img_src_start_index - 8);
              const img_src = item.substring(img_src_start_index, img_src_end_index);
              const img_s3_url = this.examRepository.addImageS3(img_src, img_extension);
              // 보기그림 유형
              return {
                type: 'image',
                value: img_s3_url,
              };
            } else {
              // 보기문 유형
              return {
                type: 'text',
                value: item,
              };
            }
          });
          const choice_1_value = clearText(other.substring(choice_1_index + 1, choice_2_index));
          const choice_2_value = clearText(other.substring(choice_2_index + 1, choice_3_index));
          const choice_3_value = clearText(other.substring(choice_3_index + 1, choice_4_index));
          const choice_4_value = clearText(other.substring(choice_4_index + 1, answer_start_index));
          const answer_value = clearText(other.substring(answer_start_index + 4, solve_start_index));
          const solve_value = clearText(other.substring(solve_start_index + 4, other_end_index));
          const choice_array = [
            { option: '1', type: 'text', value: choice_1_value },
            { option: '2', type: 'text', value: choice_2_value },
            { option: '3', type: 'text', value: choice_3_value },
            { option: '4', type: 'text', value: choice_4_value },
          ];
          question_object = {
            sort_num,
            question_num,
            question: question_value,
            example: example_value_array,
            choice: choice_array,
            answer: answer_value,
            solve: solve_value,
          };
          question_datas.push(question_object);
        }
      } else if (billiard_index > dot_index) {
        // 알림유형
        const other = item.substring(dot_index + 1, item.length);
        const example_start_index = item.indexOf('--보기문');
        const other_end_index = other.length;

        if (example_start_index < 0) {
          // 보기문 없는 유형
          const question_value = clearText(other.substring(2, other_end_index));
          question_object = {
            sort_num,
            question: question_value,
          };
          question_datas.push(question_object);
        } else if (example_start_index > 0) {
          // 보기문 있는 유형
          const question_value = clearText(other.substring(2, example_start_index));
          const example_init = clearText(other.substring(example_start_index + 5, other_end_index));
          const example_init_array = example_init.split('--보기문');
          const example_edit_array = example_init_array.map((item) => item.trim());

          const example_value_array = example_edit_array.map((item) => {
            if (item.indexOf('<img') === 0) {
              const img_src_start_index = item.indexOf('base64,') + 7;
              const img_src_end_index = item.indexOf('" />');
              const img_extension_start_index = item.indexOf('data:image/') + 11;
              const img_extension = item.substring(img_extension_start_index, img_src_start_index - 8);
              const img_src = item.substring(img_src_start_index, img_src_end_index);
              const img_s3_url = this.examRepository.addImageS3(img_src, img_extension);
              // 보기그림 유형
              return {
                type: 'image',
                value: img_s3_url,
              };
            } else {
              // 보기문 유형
              return {
                type: 'text',
                value: item,
              };
            }
          });
          question_object = {
            sort_num,
            question: question_value,
            example: example_value_array,
          };
          question_datas.push(question_object);
        }
      }
    });

    // const addQuestionResult = await this.examRepository.addQuestions(exam_id, question_datas);
    // return addQuestionResult;
    return question_datas;
  };
}

module.exports = ExamService;
