const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const e = require('express');

const app = express();

// static folder
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  console.log(firstName, lastName, email);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
