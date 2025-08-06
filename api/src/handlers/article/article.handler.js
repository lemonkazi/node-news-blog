const BaseHandler = require('../BaseHandler');
const ArticleService = require('../../services/article/ArticleService');
const ArticleDao = require('../../daos/article/ArticleDao');

const articleService = new ArticleService(new ArticleDao());

class ArticleHandler extends BaseHandler {
  constructor(service) {
    super(service);
    this.getFeed = this.getFeed.bind(this);
  }

  async getFeed(req, res) {
    try {
      const pref = await req.user.getUserPreference(); // assuming association exists
      if (!pref) return res.json({ data: [] });

      const { sources = [], categories = [], authors = [] } = pref;

      const where = {};
      if (sources.length) where.source = { [Op.in]: sources };
      if (categories.length) where.category = { [Op.in]: categories };
      if (authors.length) where.author = { [Op.in]: authors };

      const articles = await this.service.dao.findAll({ ...where });
      res.json({ data: articles });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ArticleHandler(articleService);