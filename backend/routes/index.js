const router = require('express').Router();
const eventoRutas = require('./eventoRoutes');
const passport = require('passport');
const authRoutes = require('./authRoutes');
const sesionRoutes = require('./sessionRoutes');
const registerRoutes=require('./registroLocalRoutes');
const locaLogin=require('./localLoginRoutes');



//documentacion
router.use('/',require('./swagger'));

//rutas de eventos
router.use('/api/eventos', eventoRutas);
//ruta para obetener la informacion de la sesion
router.use('/api/sesion', sesionRoutes);
//registrar local
router.use('/api',registerRoutes);
//login local
router.use('/',locaLogin);
//oauth rutas
router.get('/login/github', passport.authenticate('github'), (req, res) => {});
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//callback rutas 
router.use('/', authRoutes);




module.exports = router;//just for changes