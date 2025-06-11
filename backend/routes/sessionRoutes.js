const router = require('express').Router();
const { getSessionInfo, getSessionInfoAndrokolis } = require('../controllers/sessionController');

router.get('/api/sesion', getSessionInfoAndrokolis);

module.exports = router;
