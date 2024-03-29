const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/User');
//const flash = require('connect-flash');
//LoginPage --> now nested in pathway users/login
const passport = require('passport');

router.get('/login', (req,res) => res.render('Login'))

//register Pages --> now nested in pathway users/register
router.get('/register', (req,res) => res.render('register'))

//register Handle
router.post('/register', (req,res) => {
  // console.log(req.body)
  // res.send('hello')
  const { name, email, password, password2 } = req.body;
  let errors = [];
  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    //these are all the values that will be past to register, through destructuring  const { name, email, password, password2 } = req.body;
    res.render('register', {
      errors, //want to loop through and display these messages
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        //above creates the instance, but its not saved yet.
        console.log(newUser)
        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //after password is set to hash conversion of password that user is then saved on mongodb
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

//Login Handle

// Login
router.post('/login', (req, res, next) => {
  //local cites the local strategy - specific term in passport
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router;