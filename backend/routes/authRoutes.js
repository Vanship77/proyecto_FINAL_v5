const express = require('express');
const passport = require('passport');
const router = express.Router();
const {clearSessionIfExists}=require('../oauth/clearSession');

// Ruta inicio login GitHub
router.get('/login/github', clearSessionIfExists, passport.authenticate('github'));

// Callback GitHub
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/home', session: true }),
  (req, res) => {
    
    req.session.user = {
      _id: req.user._id,               
      displayName: req.user.displayName,
      photos: req.user.photos,
      
    };
    res.redirect('http://localhost:4200/home');
  });

// Ruta inicio login Google
router.get('/login/google', clearSessionIfExists,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


// Callback Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/home', session: true }),
  (req, res) => {
    req.session.user = {
      _id: req.user._id,
      displayName: req.user.displayName,
      photos: req.user.photos,
      
    };
    res.redirect('http://localhost:4200/home');
  });

module.exports = router;