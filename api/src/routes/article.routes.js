const express = require('express');
const { createArticle, getArticles, getArticleById, getPersonalizedFeed } = require('../controllers/article.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authenticate, createArticle); // protected
router.get('/', getArticles);                  // public
router.get('/:id', getArticleById);            // public
router.get('/feed/personalized', authenticate, getPersonalizedFeed);

module.exports = router;
