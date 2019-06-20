const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser --->> now part of express -- middleware for the form/// where before you would write bodyparser.urlencoded
app.use(express.urlencoded({ extended:false})) // i dont' know why extended is false // BUT this way you can get data from the form, through req.body

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Connect flash
app.use(flash());

//routes

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

//http://localhost:3000/users/register
//http://localhost:3000/users/login