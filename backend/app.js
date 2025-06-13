const express = require('express');
const dotenv = require('dotenv');
const { initDB } = require('./bd/BD');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// CORS permite solo peticione de un origen en especifico en este caso nuestro front end de angular 
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


// DB
initDB((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
});



// Logout
app.get('/logout', (req, res) => {
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




// Rutas
app.use('/', require('./routes'));
//servir imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
