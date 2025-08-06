const express = require('express');
const router = express.Router();
const userHandler = require('../handlers/user/user.handler');
const authenticate = require('../middlewares/auth.middleware');

// Admin/secure access assumed
router.get('/', authenticate, userHandler.getAll);
router.get('/:id', authenticate, userHandler.getById);
router.post('/', authenticate, userHandler.create);
router.put('/:id', authenticate, userHandler.update);
router.delete('/:id', authenticate, userHandler.remove);

router.get('/me', authenticate, (req, res) => {
  const { id, name, email } = req.user;
  res.json({ id, name, email });
});

module.exports = router;
