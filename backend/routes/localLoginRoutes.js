const express = require('express');
const router = express.Router();
const login1 = require('../controllers/loginLocal');


router.post('/login' ,login1.loginUser);
router.post('/logout',login1.logoutUser);

module.exports = router;
