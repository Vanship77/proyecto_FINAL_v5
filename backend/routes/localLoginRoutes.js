const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginLocal');


router.post('/login' ,loginUser);

module.exports = router;
