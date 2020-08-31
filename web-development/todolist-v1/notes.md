# EJS - Embedded JavaScript templating

## Using EJS with Express

`npm i ejs`

Create a 'views' directory containing a 'list.ejs' file

Place a marker in the ejs file

```html
<h1>It's a <%=kindOfDay%></h1>
```

```js
// imports
const express = require('express');

// init app
const app = express();

// init ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let today = new Date().getDay(); // returns # from 0 to 6

  // day array
  let week = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  // set the kindOfDay marker to the actual day, then render the day in the list
  res.render('list', { kindOfDay: week[today] });
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
```
