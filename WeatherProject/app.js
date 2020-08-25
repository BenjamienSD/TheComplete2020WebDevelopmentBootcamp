// init express and https
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// server GET request, send html
app.get('/', (serverRequest, serverResponse) => {
  serverResponse.sendFile(__dirname + '/index.html');
});

// server POST request, city & units
app.post('/', (serverRequest, serverResponse) => {
  const query = serverRequest.body.city;
  const apiKey = 'apiKey';
  const units = serverRequest.body.units;

  // check for unit type
  function checkUnit(units) {
    if (serverRequest.body.units === 'imperial') {
      unit = 'Fahrenheit';
    } else {
      unit = 'Celcius';
    }
  }

  checkUnit();

  // set url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

  // https API GET request, handle API response
  https.get(url, (apiResponse) => {
    console.log(apiResponse.statusCode);

    // response returns data (hex), use JSON.parse to convert to JSON, log the data
    apiResponse.on('data', (data) => {
      // declare constants
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      // handle server response
      serverResponse.write(`<img src="${imgUrl}"/>`);
      serverResponse.write(`<p>The weather is currently ${desc}</p>`);
      serverResponse.write(
        `<h1>The temperature in ${query} is ${temp} degrees ${unit}</h1>`
      );
      serverResponse.send();
    });
  });
});

/*
  
*/

app.listen(3000, () => {
  console.log('Running on port 3000...');
});
