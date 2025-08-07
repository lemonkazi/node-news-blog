const BaseDao = require('../BaseDao');
const ArticleModel = require('../../models/Article');
const { Op } = require('sequelize');

class ArticleDao extends BaseDao {
  constructor() {
    super(ArticleModel);
  }

  async findAllWithFilters(filter = {}) {
    const { page = 1, limit = 10, search, category, source, fromDate, toDate, ...rest } = filter;
    if (Object.keys(rest).length > 0) {
      console.warn('Unused filter keys detected:', rest);
    }
    const where = {};

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }
    if (category) where.category = category;
    if (source) where.source = source;
    if (fromDate || toDate) {
      where.publishedAt = {};
      if (fromDate) where.publishedAt[Op.gte] = new Date(fromDate);
      if (toDate) where.publishedAt[Op.lte] = new Date(toDate);
    }

    const result = await this.model.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['publishedAt', 'DESC']],
    });

    return {
      data: result.rows,
      pagination: {
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    };
  }
}

module.exports = ArticleDao;
