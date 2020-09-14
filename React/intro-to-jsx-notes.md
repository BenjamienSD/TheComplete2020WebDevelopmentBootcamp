# React notes

## basics

index.html boilerplate  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Intro to JSX</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="root"></div>
    <script src="../src/index.js" type="text/javascript"></script>
  </body>
</html>

```

index.js basics

### Imports

```jsx
const React = require('react');
const ReactDOM = require('react-dom')
```

### ES6 imports

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
```

### Render basic content

```jsx
ReactDOM.render(WHAT TO RENDER, WHERE TO RENDER IT, CALLBACK WHEN FUNCTION COMPLETED)
```

```jsx
ReactDOM.render( <h1>Hello world</h1>, document.getElementById('root') )
```

The render method only takes in a single html element, so if you want to render multiple elements you have to nest them.

```jsx
ReactDOM.render(
  <div>
    <h1>Hello world</h1>
    <p>And goodbye</p>
  </div>
  ,document.getElementById('root')
)
```

