const router = require('express').Router();
const eventoRutas = require('./eventoRoutes');
const passport = require('passport');
const authRoutes = require('./authRoutes');
const sesionRoutes = require('./sessionRoutes');
const registerRoutes=require('./registroLocalRoutes');


//documentacion
router.use('/',require('./swagger'));

//rutas de eventos
router.use('/api/eventos', eventoRutas);
//ruta para obetener la informacion de la sesion
router.use('/api/sesion', sesionRoutes);
//registrar local
router.use('/api',registerRoutes);
//oauth rutas
router.get('/login/github', passport.authenticate('github'), (req, res) => {});
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
//callback rutas 
router.use('/', authRoutes);

router.get('/logout', function(req, res, next) {
  req.logout(err => {
    if (err) {
      console.error('Error cerrando sesión:', err);
      return res.status(500).send('Error cerrando sesión');
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});


module.exports = router;//just for changes