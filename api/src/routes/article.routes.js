const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const articleHandler = require('../handlers/article/article.handler');

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of articles
 *       500:
 *         description: Internal server error
 */
router.get('/', articleHandler.getAll);           // public list + search
/**
  * @swagger
  * /api/articles/{id}:
  *   get:
  *     summary: Get article by ID
  *     tags: [Articles]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Article ID
  *     responses:
  *       200:
  *         description: Article details
  *       404:
  *         description: Article not found
  *       500:
  *         description: Internal server error
 */
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
/**
  * @swagger
  * /api/articles/{id}:
  *   put:
  *     summary: Update an article
  *     tags: [Articles]
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Article ID
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
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
  *       200:
  *         description: Article updated
  *       404:
  *         description: Article not found
  *       500:
  *         description: Internal server error
 */
router.put('/:id', authenticate, articleHandler.update); // update
/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article deleted
 *       404:
 *         description: Article not found
 */
router.delete('/:id', authenticate, articleHandler.remove); // delete
/**
 * @swagger
 * /api/articles/feed/personalized:
 *   get:
 *     summary: Get personalized article feed
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Personalized article feed
 *       500:
 *         description: Internal server error
 */
router.get('/feed/personalized', authenticate, articleHandler.getFeed); // personalized feed

module.exports = router;
