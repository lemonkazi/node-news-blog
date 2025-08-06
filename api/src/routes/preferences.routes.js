const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const preferenceHandler = require('../handlers/preference/preference.handler');

// Auth required for all
router.use(authenticate);

router.get('/me', preferenceHandler.getMine);     // Get my preferences
router.post('/me', preferenceHandler.setMine);    // Set my preferences

// Optionally expose admin access to all preferences
router.get('/', preferenceHandler.getAll);
router.get('/:id', preferenceHandler.getById);
router.delete('/:id', preferenceHandler.remove);

module.exports = router;

