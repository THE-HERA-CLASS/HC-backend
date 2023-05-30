const ExamRepository = require('../repositories/exam.repository.js');

// let question_datas = [];

class ExamService {
  examRepository = new ExamRepository();

  addQuestions = async (exam_id, question_array) => {
    const clearText = async (text) => text.replace(/^\s+|\s+$/g, '');

    const s3_url = async (value) => {
      if (value.indexOf('<img') >= 0) {
        const img_src_start_index = value.indexOf(';base64,') + 8;
        const img_extension_start_index = value.indexOf('data:image/') + 11;
        const img_src_end_index = value.indexOf('" />');
        const img_extension = value.substring(img_extension_start_index, img_src_start_index - 8);
        const img_src = value.substring(img_src_start_index, img_src_end_index);
        const img_s3_url = await this.examRepository.addImageS3(img_src, img_extension);
        return {
          type: 'image',
          value: img_s3_url,
        };
      } else {
        return {
          type: 'text',
          value: value,
        };
      }
    };

    const question_data_array = await Promise.all(
      question_array.map(async (text, index) => {
        let question_init_array = [];
        let question_init_object = {};

        const example_start_index = text.indexOf('\n--보기문\n');
        const choice_1_index = text.indexOf('①');
        const choice_2_index = text.indexOf('②');
        const choice_3_index = text.indexOf('③');
        const choice_4_index = text.indexOf('④');
        const answer_start_index = text.indexOf('--정답');
        const solve_start_index = text.indexOf('--해설\n');
        const text_end_index = text.length;

        if (choice_1_index < 0) {
          // 알림유형
          if (example_start_index < 0) {
            // 보기문 없음
            const question_value = await clearText(text.substring(2, text_end_index));
            question_init_object = { sort_num: index + 1, question: question_value };
            // question_init_array.push(question_value);
          } else {
            // 보기문 있음
            const question_value = await clearText(text.substring(2, example_start_index));
            let example_value = await clearText(text.substring(example_start_index, text_end_index));
            const example_value_split = example_value.split('--보기문\n');
            example_value_split.shift();
            example_value = example_value_split.map((text) => text.trim());
            example_value = await Promise.all(
              example_value.map(async (example) => {
                if (example.indexOf('<img') >= 0) {
                  const img_src_start_index = example.indexOf(';base64,') + 8;
                  const img_extension_start_index = example.indexOf('data:image/') + 11;
                  const img_src_end_index = example.indexOf('" />');
                  const img_extension = example.substring(img_extension_start_index, img_src_start_index - 8);
                  const img_src = example.substring(img_src_start_index, img_src_end_index);
                  const img_s3_url = await this.examRepository.addImageS3(img_src, img_extension);
                  return {
                    type: 'image',
                    value: img_s3_url,
                  };
                } else {
                  return {
                    type: 'text',
                    value: example,
                  };
                }
              })
            );
            question_init_object = { sort_num: index + 1, question: question_value, example: example_value };
          }
        } else {
          // 문제유형
          if (example_start_index < 0) {
            // 보기문 없음
            const question_number_value = await clearText(text.substring(0, text.indexOf('. ')));
            const question_value = await clearText(text.substring(2, choice_1_index));
            question_init_object = {
              sort_num: index + 1,
              question_num: Number(question_number_value),
              question: question_value,
            };
          } else {
            // 보기문 있음
            const question_number_value = await clearText(text.substring(0, text.indexOf('. ')));
            const question_value = await clearText(text.substring(2, example_start_index));
            let example_value = await clearText(text.substring(example_start_index, choice_1_index));
            const example_value_split = example_value.split('--보기문\n');
            example_value_split.shift();
            example_value = example_value_split.map((text) => text.trim());
            example_value = await Promise.all(
              example_value.map(async (example) => {
                if (example.indexOf('<img') >= 0) {
                  const img_src_start_index = example.indexOf(';base64,') + 8;
                  const img_extension_start_index = example.indexOf('data:image/') + 11;
                  const img_src_end_index = example.indexOf('" />');
                  const img_extension = example.substring(img_extension_start_index, img_src_start_index - 8);
                  const img_src = example.substring(img_src_start_index, img_src_end_index);
                  const img_s3_url = await this.examRepository.addImageS3(img_src, img_extension);
                  return {
                    type: 'image',
                    value: img_s3_url,
                  };
                } else {
                  return {
                    type: 'text',
                    value: example,
                  };
                }
              })
            );
            question_init_object = {
              sort_num: index + 1,
              question_num: Number(question_number_value),
              question: question_value,
              example: example_value,
            };
          }
          let choice_1_value = await clearText(text.substring(choice_1_index + 1, choice_2_index));
          choice_1_value = await s3_url(choice_1_value);
          let choice_2_value = await clearText(text.substring(choice_2_index + 1, choice_3_index));
          choice_2_value = await s3_url(choice_2_value);
          let choice_3_value = await clearText(text.substring(choice_3_index + 1, choice_4_index));
          choice_3_value = await s3_url(choice_3_value);
          let choice_4_value = await clearText(text.substring(choice_4_index + 1, answer_start_index));
          choice_4_value = await s3_url(choice_4_value);
          let choice_array = [];
          choice_array.push({
            option: '1',
            type: choice_1_value.type,
            value: choice_1_value.value,
          });
          choice_array.push({
            option: '2',
            type: choice_2_value.type,
            value: choice_2_value.value,
          });
          choice_array.push({
            option: '3',
            type: choice_3_value.type,
            value: choice_3_value.value,
          });
          choice_array.push({
            option: '4',
            type: choice_4_value.type,
            value: choice_4_value.value,
          });
          const answer_value = await clearText(text.substring(answer_start_index + 4, solve_start_index));
          const solve_value = await clearText(text.substring(solve_start_index + 4, text_end_index));

          question_init_object.choice = choice_array;
          question_init_object.answer = answer_value;
          question_init_object.solve = solve_value;
        }
        return question_init_object;
      })
    );
    const addQuestionResult = await this.examRepository.addQuestions(exam_id, question_data_array);
    return {
      addQuestionResult,
      addQuestionData: question_data_array,
    };
  };
}

module.exports = ExamService;
