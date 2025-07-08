const router = require('express').Router();
const eventoRutas = require('./eventoRoutes');
const passport = require('passport');
const authRoutes = require('./authRoutes');
const sesionRoutes = require('./sessionRoutes');
const registerRoutes = require('./registroLocalRoutes');
const locaLogin = require('./localLoginRoutes');

// Documentación
router.use('/', require('./swagger'));

// Ruta básica para test
router.get('/home', (req, res) => {
  res.send('🛡️ Bienvenido a la API de Eventos en /home');
});

// Rutas de eventos
router.use('/api/eventos', eventoRutas);

// Ruta para obtener la información de la sesión
router.use('/api/sesion', sesionRoutes);

// Registro local
router.use('/api', registerRoutes);

// Login local
router.use('/', locaLogin);

// OAuth rutas
router.get('/login/github', passport.authenticate('github'), (req, res) => {});
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback rutas 
router.use('/', authRoutes);

module.exports = router;
