const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const articleHandler = require('../handlers/article/article.handler');

router.get('/', articleHandler.getAll);           // public list + search
router.get('/:id', articleHandler.getById);       // public detail

/**
 * @swagger
 * /api/articles:
  *   post:
  *     summary: Create a new article
  *     tags: [Articles]
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required: [title, content, category, source]
  *             properties:
  *               title:
  *                 type: string
  *               content:
  *                 type: string
  *               category:
  *                 type: string
  *               source:
  *                 type: string
  *               publishedAt:
  *                 type: string
  *                 format: date-time
  *     responses:
  *       201:
  *         description: Article created
  *       500:
  *         description: Internal server error
  */
router.post('/', authenticate, articleHandler.create);  // create
router.put('/:id', authenticate, articleHandler.update); // update
router.delete('/:id', authenticate, articleHandler.remove); // delete
router.get('/feed/personalized', authenticate, articleHandler.getFeed); // personalized feed

module.exports = router;
