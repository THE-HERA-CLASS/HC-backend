class SearchRepository {
  constructor(ExamsModel) {
    this.examsModel = ExamsModel;
  }

  searchExams = async (keyword) => {
    try {
      // 모든 레코드 검색
      const results = await this.examsModel.findAll({
        where: {
          [Op.or]: [
            //두 개 이상의 조건 중 하나 이상이 참일 때 레코드를 반환
            { certificate_name: { [Op.like]: `%${keyword}%` } }, // keyword를 포함하는 레코드를 찾는다.
            { subject_name: { [Op.like]: `%${keyword}%` } }, // keyword를 포함하는 레코드를 찾는다.
          ],
        },
      });
      return results;
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = SearchRepository;
