const router = require('express').Router();
const { getSessionInfo, getSessionInfoAndrokolis } = require('../controllers/sessionController');
const auth1=require('../oauth/authenticate');

router.get('/api/sesion',auth1.hybridAuth ,getSessionInfoAndrokolis);

module.exports = router;
