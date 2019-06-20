const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//User model
const User = require('../models/User')

//LoginPage --> now nested in pathway users/login
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
    //Validation passed 
    //mongoose - create model and call methods on that model
    const newUser = new User({
      name,
      email,
      password
    })
    console.log(newUser)
  res.send ('hello');
}
  
});

module.exports = router;