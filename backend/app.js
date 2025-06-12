const express = require('express');
const dotenv = require('dotenv');
const { initDB } = require('./bd/BD');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const mensajeRoute = require('./routes/mensajes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// CORS
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
}));

// Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: 'lax'
  }
}));

// Passport
require('./config/passport'); // Estrategias separadas
app.use(passport.initialize());
app.use(passport.session());

// Estado de sesión (usando req.user)
app.get('/', (req, res) => {
  res.send(req.user ? `Logged in as: ${req.user.firstName}` : 'Logged out');
});

// DB
initDB((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
});





// Estado de sesión (usando req.user)
app.get('/', (req, res) => {
  res.send(req.user ? `Logged in as: ${req.user.firstName}` : 'Logged out');
});
// Ver estado sesión

// Rutas
app.use('/', require('./routes'));
app.use('/api', require('./routes/mensajes'));  
//servir imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Start server
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
