// imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const https = require('https');

// init app
const app = express();

// init ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let today = new Date().getDay(); // returns # from 0 to 6

  // using array
  let week = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  // render the day in the list marker
  res.render('list', { kindOfDay: week[today] });
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
