# Express

• A (web)framework that adds functionality to node.  
• Reduces the amount of code that needs to be written in web applications

## create server.js

`npm init`

`entry point: (server.js)`

## install express

`npm i express`

```js
// import express module.
const express = require('express');

// create an express application, express() is a function exported by the express module.
const app = express();

// listen to port 3000 for any http requests, callback function to log status.
app.listen(3000, function () {
  console.log('Server started on port 3000');
});
```

`localhost:3000` ⇒ `cannot GET /`

```js
// what should happen when a browser connects to our app and makes a request
// first parameter is location, / = root, second parameter is callback function (action)
app.get('/', function (request, response) {
  response.send('Hello from the root');
});
```

## Understanding and working with routes

### nodemon

• monitors server for changes and auto restarts

`npm i -g nodemon`

`nodemon server.js`

## adding routes

```js
// about route
app.get('/about', function (req, res) {
  res.send("I'm Ben, I'm awesome");
});
```
