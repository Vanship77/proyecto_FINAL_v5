const router = require('express').Router();
const authController = require('../controllers/registroLocal');

router.post('/api/auth/register', authController.registerLocal);

module.exports = router;
