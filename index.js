require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const strategy = require('./stratgey');

const app = express();

app.use(
  session({
    secret: 'what up',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: '/me',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.get('/me', (req, res, next) => {
  //   !req.user ? res.redirect('./login') : res.status(200).send(req.user);

  if (!req.user) {
    res.redirect('/login');
  } else {
    res.status(200).send(req.user);
  }
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
