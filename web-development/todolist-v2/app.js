// imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const date = require(__dirname + '/date.js'); // local module

// init app
const app = express();

// init ejs
app.set('view engine', 'ejs');

// init body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// init static resources
app.use(express.static('public'));

// create database
mongoose.connect('mongodb://localhost:27017/todoListDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create Schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

// custom list schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

// create the Model
const Item = mongoose.model('Item', itemsSchema);

// custom list model
const List = mongoose.model('List', listSchema);

// placeholder documents
const item1 = new Item({
  name: 'Welcome to your todo list',
});
const item2 = new Item({
  name: 'Hit the + button to add a new item',
});
const item3 = new Item({
  name: '<-- Hit this to delete an item',
});

// placeholder list
const placeholderItems = [item1, item2, item3];

// listOfLists
app.get('/', (req, res) => {
  // list view

  // get all the list items
  Item.find((err, items) => {
    // error handling
    if (err) {
      console.log(err);
      // if empty, add placeholder then redirect to display
    } else if (items.length === 0) {
      Item.insertMany(placeholderItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Succesfully added to collection');
        }
      });
      res.redirect('/');
      // if not empty, just render
    } else {
      res.render('list', {
        // listTitle: date.getDay(),
        listTitle: 'Today',
        newListItems: items,
      });
    }
  });
});

/* // work list view
app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
}); */

// create custom list
app.get('/:listName', (req, res) => {
  const listName = req.params.listName;
  List.findOne({ name: listName }, (err, list) => {
    if (err) {
      console.log(err);
    } else if (list) {
      console.log('exists');
      res.render('list', {
        listTitle: list.name,
        newListItems: list.items,
      });
    } else {
      console.log(`doesn't exist`);
      const list = new List({
        name: listName,
        items: placeholderItems,
      });
      list.save();
      res.render('list', {
        listTitle: list.name,
        newListItems: list.items,
      });
    }
  });
});

// about view
app.get('/about', (req, res) => {
  res.render('about');
});

// get item from input
// add to appropriate list, and redirect to appropriate page
// req.body.list captures the first word from listTitle, in this case either 'Work' or the day
app.post('/', (req, res) => {
  let item = new Item({
    name: req.body.newItem,
  });

  if (item.name === '') {
    console.log('nothing entered');
    res.redirect('/');
  } else if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    item.save();
    res.redirect('/');
  }
});

// delete items
app.post('/delete', (req, res) => {
  const itemId = req.body.checkbox;
  Item.findByIdAndRemove(itemId, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${item.name} deleted`);
      res.redirect('/');
    }
  });
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
