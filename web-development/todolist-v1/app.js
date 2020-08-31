// imports
const express = require('express');
const bodyParser = require('body-parser');

// init app
const app = express();

// variables
let items = [];
let workItems = [];

// init body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// init static resources
app.use(express.static('public'));

// init ejs
app.set('view engine', 'ejs');

// list view
app.get('/', (req, res) => {
  let today = new Date();
  let options = { weekday: 'long', day: 'numeric', month: 'long' };

  // render the day in the list marker
  res.render('list', {
    listTitle: today.toLocaleDateString('en-US', options),
    newListItems: items,
  });
});

// work list view
app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

// about view
app.get('/about', (req, res) => {
  res.render('about');
});

// get item from input
// add to appropriate list, and redirect to appropriate page
// req.body.list captures the first word from listTitle, in this case either 'Work' or the day
app.post('/', (req, res) => {
  let item = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
