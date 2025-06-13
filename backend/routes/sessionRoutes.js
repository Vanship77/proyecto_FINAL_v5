const router = require('express').Router();
const { getSessionInfo, getSessionInfoAndrokolis } = require('../controllers/sessionController');
const jwt=require('../middlewares/loginLocalValidator');

router.get('/api/sesion',jwt.authMiddleware ,getSessionInfoAndrokolis);

module.exports = router;
