const router = require('express').Router();
const register=require('../controllers/registroLocal');
const upload=require('../middlewares/uploads');

router.post('/register',upload.single('photo'),register.registerUser);

module.exports = router;
