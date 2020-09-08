# EJS - Embedded JavaScript templating

## Connecting the application to the database

Right now we push new items onto the `items` array.  
Instead we will now add them to the a database collection.

First install mongoose in the project.

`npm i mongoose`

```js
const mongoose = require('mongoose');
```

Create the database

```js
mongoose.connect('mongodb://localhost:27017/todoListDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

Create the schema and the model

```js
// create Schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

// create the Model
const Item = mongoose.model('Item', itemsSchema);
```

Create the document

```js
// placeholder documents
const item1 = new Item({
  name: 'Welcome to your todo list',
});
const item2 = new Item({
  name: 'Hit the + button to add a new item',
});
const item3 = new Item({
  name: 'Hit <-- this to delete an item',
});

// placeholder list
const placeholderItems = [item1, item2, item3];

// list view
app.get('/', (req, res) => {
  // get all the list items
  Item.find((err, items) => {
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
        listTitle: 'Today',
        newListItems: items,
      });
    }
  });
});
```

Adding items.

```js
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
```

In the ejs file we wrap each item in a form which gives us the option to delete the item.  
We do this by giving the checkbox the value of `item._id` then tapping in to that value in the delete method in `app.js`.

```html
<% newListItems.forEach((item) => { %>
<form action="/delete" method="post">
  <div class="item">
    <input
      type="checkbox"
      value="<%=item._id%>"
      name="checkbox"
      onChange="this.form.submit()"
    />
    <p><%=item.name%></p>
  </div>
</form>
<% }) %>
```

Deleting the item.

```js
// delete items
app.post('/delete', (req, res) => {
  const itemId = req.body.checkbox; // returns the id
  Item.findByIdAndRemove(itemId, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${item.name} deleted`);
      res.redirect('/');
    }
  });
});
```

## Dynamic routing

First we create a new collection that we will use to store our custom lists.

```js
// schema
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

// model
const List = mongoose.model('List', listSchema);
```

Custom lists can be created by creating a list based on routing parameters.  
If we route to `localhost:3000/work` we search the `lists` collection if that list already exists.  
If it does we just render that list, if it doesn't we create and render it.

```js
// CUSTOM LIST
//////////////
app.get('/:listName', (req, res) => {
  // get listname from routing params
  const listName = req.params.listName;

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
```

In order to add new items to the correct list we have to grab both the new todo item as well as the currently rendered list.

```html
<form class="item" action="/" method="post">
  <input type="text" name="newItem" placeholder="New Item" autocomplete="off" />
  <!--prettier-ignore-->
  <button type="submit" name="list" value= <%= listTitle %>  >+</button>
</form>
```

We get the new todo item from the text input value and the currently rendered list from the button value.

```js
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

    // if in today list, add to 'items' collection
  } else if (listName === 'Today') {
    console.log(`${item.name} added to Today`);
    item.save();
    res.redirect('/');

    // else seach the 'lists' collection for the current listname and add the item to that list
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
```

Deleting items from the custom lists using `$pull`  

```js
// delete items
app.post('/delete', (req, res) => {
  // get item id and currently rendered list
  const itemId = req.body.checkbox;
  const listName = req.body.listName

  // if in 'Today' list
  if (listName === "Today") {
    Item.findByIdAndRemove(itemId, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${item.name} deleted`);
        res.redirect('/');
      }
    });

  // else check the lists collection for the list name, then use the mongoDB $pull operator to pull the item with the correct itemId from the items array
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
```