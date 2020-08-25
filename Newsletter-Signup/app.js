const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
