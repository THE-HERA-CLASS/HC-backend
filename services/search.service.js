const SearchRepository = require('../repositories/search.repository');

class SearchService {
  searchRepository = new SearchRepository();

  searchExams = async (keyword) => {
    try {
      const results = await this.searchRepository.searchExams(keyword);
      
      if (!results) {
        return [];
      }

      return results.map((result) => {
        if (result.certificate_name.includes(keyword)) {
          return {
            certificate_name: result.certificate_name,
            subject_name: result.subject_name,
          };
        } else {
          return {
            subject_name: result.subject_name,
          };
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = SearchService;

