const express = require('express');
const authenticate = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

module.exports = router;
