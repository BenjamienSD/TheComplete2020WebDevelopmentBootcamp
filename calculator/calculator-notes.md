# Calculator

## responding to requests with HTML files

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
  </head>
  <body>
    <form action="/" method="post">
      <input type="text" name="num1" placeholder="First Number" />
      <input type="text" name="num2" placeholder="Second Number" />
      <button type="submit" name="submit">Calculate</button>
    </form>
  </body>
</html>
```

calculator.js

```js
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});
```

`res.sendFile(__dirname + "/index.html")` selects the index.html file current directory of calculator.js

## POST method

post formdata (send) to root (calculator.js)

```html
<!--index.html-->
<form action="/" method="post"></form>
```

```js
// calculator.js
app.post('/', function (req, res) {
  res.send('Posting works');
});
```

## body-parser

install body-parser  
`npm i body-parser`

```js
// calculator.js
const bodyParser = require('body-parser');

// body-parser has a few modes, .text, .json, .urlencoded
// urlencoded is used to parse data that comes from an html form
// 'extended: true' allows the posting of nested objects
app.use(bodyParser.urlencoded({ extended: true }));
```

## req.body

req.body is the parsed version of the http request

```js
// app.post
console.log(req.body);
// { num1: '1', num2: '2', submit: '' }
```

## doing the calculation

```js
app.post('/', function (req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;
  res.send('The result = ' + result);
});
```
