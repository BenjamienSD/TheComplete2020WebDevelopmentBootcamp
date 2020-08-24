const express = require('express');
const app = express();

// root route
app.get('/', function (request, response) {
  response.send('<h1>Hello World!</h1>');
});

// about route
app.get('/about', function (req, res) {
  res.send("I'm Ben, I'm awesome");
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
