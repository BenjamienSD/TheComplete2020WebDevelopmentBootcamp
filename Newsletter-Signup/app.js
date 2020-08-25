const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from root');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
