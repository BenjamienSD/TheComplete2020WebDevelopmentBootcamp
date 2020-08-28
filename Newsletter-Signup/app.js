// imports
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

// init app
const app = express();

// set .env
require('dotenv').config();
const url = process.env.url;
const auth = process.env.auth;

// static folder
app.use(express.static('public'));

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

// send homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// get user data and post to mailchimp server
app.post('/', (req, res) => {
  // user data
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  // mailchimp API post request url & options
  let options = {
    method: 'POST',
    auth: auth,
  };

  // create user data object
  let data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  // turn user data into json string to send to mailchimp
  let jsonData = JSON.stringify(data);

  // create the request using the url, options & user data
  const apiRequest = https.request(url, options, (apiResponse) => {
    /*
    res.on('data', (data) => {
      console.log(JSON.parse(data));
    });
    */
    if (apiResponse.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
  });

  // write the request to the server
  apiRequest.write(jsonData);
  apiRequest.end();
});

// failure route
app.post('/failure', (req, res) => {
  res.redirect('/');
});

// set port
const port = process.env.PORT || 3000;

// check server running
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
