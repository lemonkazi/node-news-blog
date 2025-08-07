const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const preferenceHandler = require('../handlers/preference/preference.handler');

// Auth required for all
router.use(authenticate);

/**
 * @swagger
 * /api/preferences/me:
 *   get:
 *     summary: Get user preferences
 *     tags: [Preferences]
 *     responses:
 *       200:
 *         description: User preferences retrieved
 *       404:
 *         description: Preferences not found
 */
router.get('/me', preferenceHandler.getMine);     // Get my preferences
/**
 * @swagger
 * /api/preferences/me:
 *   post:
 *     summary: Set user preferences
 *     tags: [Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               sources:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 */
router.post('/me', preferenceHandler.setMine);    // Set my preferences

// Optionally expose admin access to all preferences
/**
 * @swagger
 * /api/preferences:
 *   get:
 *     summary: Get all preferences
 *     tags: [Preferences]
 *     responses:
 *       200:
 *         description: List of all user preferences
 */
router.get('/', preferenceHandler.getAll);
/**
 * @swagger
 * /api/preferences/{id}:
 *   get:
 *     summary: Get preference by ID
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Preference ID
 *     responses:
 *       200:
 *         description: Preference details
 *       404:
 *         description: Preference not found
 */
router.get('/:id', preferenceHandler.getById);

// delete preference by ID
/**
 * @swagger
  * /api/preferences/{id}:
  *   delete:
  *     summary: Delete preference by ID
  *     tags: [Preferences]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: Preference ID
  *     responses:
  *       200:
  *         description: Preference deleted successfully
  *       404:
  *         description: Preference not found
  */
router.delete('/:id', preferenceHandler.remove);

module.exports = router;

