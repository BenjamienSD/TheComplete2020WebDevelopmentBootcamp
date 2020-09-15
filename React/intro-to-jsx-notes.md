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
    <script src="../src/index.js" type="text/JXS"></script>
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

### JavaScript expressions & template literals

To use js expressions in jsx, wrap them in curly brackets.

```jsx
import React from "react";
import ReactDOM from "react-dom";

const name = "Bob"

ReactDOM.render(
  <div>
    <h1>Hello {name}!</h1>
    <p>Your lucky number is {Math.floor(Math.random() * 10)}</p>
  </div>
  , document.getElementById("root")
);

// Hello Bob!
// Your lucky number is 7
```

#### Template literals

```jsx
const fName = "Bob"
const lName = "Bobbington"

ReactDOM.render(
  <div>
    <h1>Hello {`${fname} ${lname}`}!</h1>
  </div>
  , document.getElementById("root")
);

// Hello Bob Bobbington!
```

### Inline styling

In JSX styling is provide through a js object:  
{
  key: value
}  
In order to pass a js expression it has to be wrapped in curly braces. Hence the 2 pairs.

```js
ReactDOM.render(
  <div>
    <h1 style={{color: "red", backgroundColor: "blue"}}>Hello {`${fname} ${lname}`}!</h1>
  </div>
  , document.getElementById("root")
);
```

#### Using style objects

```js
const customStyle = {
  color: "red",
  backgroundColor: "blue",
  border: "1px solid black"
}

ReactDOM.render(
  <div>
    <h1 style={customStyle}>Hello {`${fname} ${lname}`}!</h1>
  </div>
  , document.getElementById("root")
);
```

### Conditional styling

```js
import React from 'react'
import ReactDOM from 'react-dom'

let greeting;
const style = {
  color: ""
};
const hour = new Date().getHours();

if (hour > 17) {
  style.color = "blue";
  greeting = "Good evening";
} else if (hour > 11) {
  style.color = "green";
  greeting = "Good afternoon";
} else {
  style.color = "red";
  greeting = "Good morning";
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={style}>{greeting}</h1>
  </div>,
  document.getElementById('root')
)
```

### Components

React convention for components: PascalCase

Creating and exporting the component

`Heading.jsx`

```js
import React from 'react'

function Heading() {
  return <h1>I'm over here now</h1>
}

export default Heading
```

Importing the component

`index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Heading from './Heading'

ReactDOM.render(
  <div>
  <Heading />
  <p>Other content</p>
  </div>,
  root
)
```

Convention is to import all the components into app.jsx, then import app into index.js.  

`index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <app />,
  document.getElementById('root')
)
```

`App.jsx`

```js
import React from 'react'
import Heading from './Heading'
import List from './List'

const App = () => {
  return (
    <div>
      <Heading />,
      <List />
    </div>
  )
}

export default App
```

### ES6 Import, Export & modules

Exporting

```js
const pi = 3.1415962

const doublePi = () => {
  return pi * 2
}

const triplePi = () => {
  return pi * 3
}

export default pi
export { doublePi, triplePi }
```

Importing

Since `pi` is exported as default, it can be named anything during import, in this case 'x'

```js
import x, { doublePi, triplePi } from "./math.js"
```

Batch import (discouraged in many styleguides)

```js
import * as pi from "./math.js"

// then call

pi.default
pi.doublePi()
pi.triplePi()
```
