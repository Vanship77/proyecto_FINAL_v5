const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginLocal');
const jwt=require('../middlewares/loginLocalValidator');

router.post('/login' ,loginUser);

module.exports = router;
