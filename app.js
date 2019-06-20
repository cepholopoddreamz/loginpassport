const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

//http://localhost:3000/users/register
//http://localhost:3000/users/login