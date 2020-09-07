# EJS - Embedded JavaScript templating

## Using EJS with Express

`npm i ejs`

Create a 'views' directory containing a 'list.ejs' file

Place a marker in the ejs file

```html
<h1><%=kindOfDay%> list</h1>
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

## Running code inside the template using a 'scriptlet' tag

Scriptlet tags only allow for control flow logic (if/else, while...)
If it's a saturday, render the h1 in a slightly different colour.
Put the scriptlet tag around anything that isn't html

```html
<body>
  <% if (kindOfDay === "Saturday" || kindOfDay === "Sunday") { %>
  <h1 style="color: purple"><%=kindOfDay %> To Do List</h1>
  <% } else { %>
  <h1 style="color: blue"><%=kindOfDay %> To Do List</h1>
  <% } %>
</body>
```

## toLocaleDateString()

Instead of using an array to list the day

```js
app.get('/', (req, res) => {
  let today = new Date();
  let options = { weekday: 'long', day: 'numeric', month: 'long' };

  // render the day in the list marker, using toLocaleDateString and the options to format the date
  res.render('list', { kindOfDay: today.toLocaleDateString('en-US', options) });
});
```

## Utilizing EJS to dynamically display list items

Declare the `enteredItems` array at the top so it is accessible from the `get` and `post` methods.  
Init `body-parser` to parse `req.body`

```js
let enteredItems = [];
app.use(bodyParser.urlencoded({ extended: true }));

// show date and list
app.get('/', (req, res) => {
  let today = new Date();
  let options = { weekday: 'long', day: 'numeric', month: 'long' };

  // render the day in the kindOfDay marker and the enteredItems in the newListItems marker
  res.render('list', {
    kindOfDay: today.toLocaleDateString('en-US', options),
    newListItems: enteredItems,
  });
});

// when a new item is added through af post form, add item to list and redirect to the home route where the list is rendered
app.post('/', (req, res) => {
  enteredItems.push(req.body.newItem);
  res.redirect('/');
});
```

In the EJS file we loop through the `newListItems` array and render a `li` for each item in the array, making sure to use the proper EJS tags.

```html
<body>
  <h1><%=kindOfDay%></h1>

  <form action="/" method="post">
    <ul id="todoList">
      <% for (let i = 0; i < newListItems.length; i++) { %>
      <li><%=newListItems[i]%></li>
      <% } %>
    </ul>
    <input type="text" name="newItem" />
    <button type="submit" name="button">Add Item</button>
  </form>
</body>
```

## Applying CSS to an express project

By default express only serves up the main entry point and the views folder.
If you want to use a file it has to be brought in by the server.

Create a folder `public`
In `public` create a folder `css`, in which you put the css file.

In `app.js`

```js
app.use(express.static('public'));
```

## Multiple routes

```html
<h1><%=listTitle%></h1>
<button type="submit" name="list" value="<%" ="listTitle" %>>+</button>
```

```js
// creating 2 separate lists
let items = [];
let workItems = [];

// work todo list
app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

// get item from input
// when the button is pushed, depending on wether you are on the "/" route or "/work" route, the list title will be different
// add to appropriate list, and redirect to appropriate page
// req.body.list captures the first word from the listTitle marker, in this case either 'Work' or the day
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
```

## Templates and Layouts

The way I see it templates are dynamic placeholders for data, whereas layouts are preconfigured parts of pages that can be reused. A bit like react components.

You can create layouts by taking parts of the main html and putting it into a view.  
For instance `header.ejs` contains everything from `<!DOCTYPE html>` to the opening `<body>` tag.  
`footer.ejs` contains everything from the closing `body` tag down.  
You can then create any page in the `views` folder and sandwich any content in between the `header` and `footer` markers.

```html
<%- include('header')-%>

<div class="box" id="heading">
  <h1>About</h1>
</div>
<div class="box item">
  <p>
    This is a To Do app based on Node.js, Express and EJS, demonstrating the use
    of templates and layouts.
  </p>
</div>

<%- include('footer')-%>
```

## Creating node modules

create a new js file in project root, for instance `date.js`

```js
// date module

// date module
exports.getDate = function () {
  let today = new Date();
  let options = { weekday: 'long', day: 'numeric', month: 'long' };
  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function () {
  let today = new Date();
  let options = { weekday: 'long' };
  return today.toLocaleDateString("en-US", options);
}

```

Then in the main app, require it.

```js
// local modules require file extension.
const date = require(__dirname + '/date.js')

// simply call it
date.getDay();
date.getDate();
```

## Refactoring

```js
// You can manipulate arrays declared as constant but you can not redeclare them
const array = []
array.push('a') // ['a']
array = ['b'] // error

// likewise with objects
const myObject = {'key': 'value'}
myObject = {'otherKey': 'otherValue'} // error
myObject.key = 'otherValue' // {'key': 'otherValue'}
```