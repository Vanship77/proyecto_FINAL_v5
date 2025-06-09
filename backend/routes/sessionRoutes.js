const router = require('express').Router();
const { getSessionInfo } = require('../controllers/sessionController');

router.get('/api/sesion', getSessionInfo);

module.exports = router;
