const express = require('express');
const router = express.Router();

//LoginPage --> now nested in pathway users/login
router.get('/login', (req,res) => res.render('Login'))

//register Pages --> now nested in pathway users/register
router.get('/register', (req,res) => res.render('register'))

module.exports = router;