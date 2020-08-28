// imports
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const https = require('https');

// init app
const app = express();

// saturday = 6, sunday = 0
app.get('/', (req, res) => {
  let weekend = 6 || 0;
  let today = new Date().getDay();
  let daysLeft = 6 - today;

  if (today === weekend) {
    res.send("Yay it's the weekend!");
  } else {
    res.write('<h1>Back to work you maggot!</h1>');
    res.write(`${daysLeft} day left to work!`);
    res.send();
  }
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
