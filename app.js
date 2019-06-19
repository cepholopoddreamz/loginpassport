const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

//http://localhost:3000/users/register
//http://localhost:3000/users/login