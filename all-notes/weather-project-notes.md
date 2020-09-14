# Weather API project

## Making GET request with the Node HTTPS module

Standard node library = https (native).  
Alternatives: Axios, SuperAgent, Fetch, Got.

```js
const https = require('https');
```

`https.get(url[, options][, callback])`.

In the callback we process the response using `response.on()`.  
We can use the chrome plugin 'Awesome JSON Viewer' to easily deconstruct the object and extract the relevant data, like temp.

```js
// Server GET request, then handle the server response
app.get('/', (serverRequest, serverResponse) => {
  // set url
  const url = 'https://api.openweathermap.org/d...';

  // https API GET request, handle API response
  https.get(url, (apiResponse) => {
    console.log(apiResponse.statusCode);

    // response returns data (hex), use JSON.parse to convert to JSON, log the data
    apiResponse.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      serverResponse.send('The temperature in Gent is ' + temp + '°C');
    });
  });
});
```

Within a single GET method you can only do 1 res.send()

## Using body-parser to parse POST requests to the server. (Getting data from user)

```js
const bodyParser = require('body-parser');

...

app.post('/', (serverRequest, serverResponse) => {
  const query = serverRequest.body.city;
  const apiKey = 'd409b3b9c3ab29ade7b28427026fad7e';
  const units = serverRequest.body.units;

...

```
