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
