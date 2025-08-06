const BaseService = require('../BaseService');

class ArticleService extends BaseService {

  // Extend later if needed (e.g. personalizedFeed)
  constructor(dao) {
    super(dao);
  }

  async findAll({ page = 1, limit = 10, search, filters = {} }) {
    return this.dao.findAllWithFilters({ page, limit, keyword: search, ...filters });
  }
}

module.exports = ArticleService;
