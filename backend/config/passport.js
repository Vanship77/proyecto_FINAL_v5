const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');


// === Estrategia GitHub ===
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL_GITHUB,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
    let user = await User.findOne({ email, provider: 'github' });

    if (!user) {
      user = new User({
        firstName: profile.displayName || profile.username,
        lastName: '',
        email: email,
        photoUrl: profile.photos?.[0]?.value,
        provider: 'github',
        role: 'user',
        events: []
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// === Estrategia Google ===
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL_GOOGLE
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    let user = await User.findOne({ email, provider: 'google' });

    if (!user) {
      user = new User({
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email,
        photoUrl: profile.photos?.[0]?.value,
        provider: 'google',
        role: 'user',
        events: []
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// === Serialización ===
passport.serializeUser((user, done) => {
  done(null, user.id); // Guarda solo el ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
