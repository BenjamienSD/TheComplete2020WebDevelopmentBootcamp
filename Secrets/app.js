// imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// init app
const app = express();

app.set('view engine', 'ejs')

// body parser & static folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect DB
/*
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/

app.get('/', (req, res) => {
  res.render('home')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})

// port config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

