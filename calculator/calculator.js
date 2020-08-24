const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// basic calculator
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;
  res.send('The result = ' + result);
});

// BMI calculator
app.get('/bmicalculator', function (req, res) {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', function (req, res) {
  let height = parseFloat(req.body.height);
  let weight = parseFloat(req.body.weight);
  let bmi = weight / (height * height);
  res.send('Your BMI is ' + bmi);
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});
