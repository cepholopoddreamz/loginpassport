const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Front page

router.get('/', (req,res) => res.render('welcome'))

router.get('/dashboard', (req,res) => res.render('dashboard', {
  user: req.user
  //this is so that you can display the user currently logged in
})
);


module.exports = router;