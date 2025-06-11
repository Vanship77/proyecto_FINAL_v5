const router = require('express').Router();
const { getSessionInfo, getSessionInfoAndrokolis } = require('../controllers/sessionController');
const jwt=require('../middlewares/loginLocalValidator');

router.get('/api/sesion',jwt.verifyToken ,getSessionInfoAndrokolis);

module.exports = router;
