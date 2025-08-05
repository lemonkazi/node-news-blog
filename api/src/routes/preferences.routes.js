const express = require('express');
const { getPreferences, setPreferences } = require('../controllers/preferences.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate); // All routes below require login

router.get('/', getPreferences);
router.post('/', setPreferences);

module.exports = router;
