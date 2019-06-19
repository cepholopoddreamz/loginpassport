const express = require('express');
const router = express.Router();

//LoginPage --> now nested in pathway users/login
router.get('/login', (req,res) => res.send('Login'))

//register Pages --> now nested in pathway users/register
router.get('/register', (req,res) => res.send('register'))

module.exports = router;