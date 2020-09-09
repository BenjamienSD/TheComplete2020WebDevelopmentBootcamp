// imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = process.env.mongoURI;
require('dotenv').config;

// init app
const app = express();

// set view engine
app.set('view engine', 'ejs');

// app.use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// model
const Article = mongoose.model('Article', articleSchema);

// test route
app.get('/', (req, res) => {
  res.send('Hello from root');
});

// port config
let port = process.env.PORT;
if (port === null || port === '') {
  port = 3000;
}
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
