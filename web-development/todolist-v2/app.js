// TODO
//* display list index on home page
//* create new list button on home page
//* delete lists

// imports
const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const bodyParser = require('body-parser');
const _ = require('lodash')

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

// HOME
///////
// list view
app.get('/', (req, res) => {
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

// CUSTOM LIST
//////////////
app.get('/:listName', (req, res) => {
  // get listname from routing params
  const listName = _.capitalize(req.params.listName);
  // search the lists collection to see if list already exists
  List.findOne({ name: listName }, (err, list) => {
    if (err) {
      console.log(err);
      // if list exists, render the list
    } else if (list) {
      res.render('list', {
        listTitle: list.name,
        newListItems: list.items,
      });
      // else create new list, then render
    } else {
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

// ABOUT
////////
app.get('/about', (req, res) => {
  res.render('about');
});

// POST
///////
app.post('/', (req, res) => {
  // get new itemname and current listname
  const itemName = req.body.newItem; // newItem is the name of the input
  const listName = req.body.list; // list is the name of the button
  // create new item
  let item = new Item({
    name: itemName,
  });
  // if blank, do nothing
  if (item.name === '') {
    console.log('nothing entered');
    res.redirect('/');
    // if today, add to 'items' collection
  } else if (listName === 'Today') {
    console.log(`${item.name} added to Today`);
    item.save();
    res.redirect('/');
    // else seach the 'lists' collection for the current listname and add to that list
  } else {
    List.findOne({ name: listName }, (err, list) => {
      if (err) {
        console.log(err);
      } else {
        list.items.push(item);
        list.save();
        res.redirect(`/${listName}`);
        console.log(`${item.name} added to ${listName} list`);
      }
    });
  }
});

// DELETE
/////////
// delete items
app.post('/delete', (req, res) => {
  const itemId = req.body.checkbox;
  const listName = req.body.listName

  if (listName === "Today") {
    Item.findByIdAndRemove(itemId, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${item.name} deleted`);
        res.redirect('/');
      }
    });
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`item removed from ${listName} list`)
        res.redirect(`/${listName}`)
      }
    })
  }
});

// port setup
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
