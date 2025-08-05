const Article = require('../models/Article');
const UserPreference = require('../models/UserPreference');
const { Op } = require('sequelize');

const createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      keyword,
      category,
      source,
      fromDate,
      toDate,
    } = req.query;

    const where = {};

    if (keyword) {
      where[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { content: { [Op.like]: `%${keyword}%` } },
      ];
    }
    if (category) where.category = category;
    if (source) where.source = source;
    if (fromDate || toDate) {
      where.publishedAt = {};
      if (fromDate) where.publishedAt[Op.gte] = new Date(fromDate);
      if (toDate) where.publishedAt[Op.lte] = new Date(toDate);
    }

    const articles = await Article.findAndCountAll({
      where,
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    res.json({
      data: articles.rows,
      pagination: {
        total: articles.count,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Add this controller:
const getPersonalizedFeed = async (req, res) => {
  try {
    const pref = await UserPreference.findOne({ where: { userId: req.user.id } });
    if (!pref) return res.status(200).json({ data: [] });

    const { sources = [], categories = [], authors = [] } = pref;

    const where = {};
    if (sources.length) where.source = { [Op.in]: sources };
    if (categories.length) where.category = { [Op.in]: categories };
    if (authors.length) where.author = { [Op.in]: authors };

    const articles = await Article.findAll({
      where,
      order: [['publishedAt', 'DESC']],
      limit: 20,
    });

    res.json({ data: articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { createArticle, getArticles, getArticleById, getPersonalizedFeed };
