# React notes

## Props

In the render method you 'request' the component to be displayed and you pass along the data you would like to be displayed in that component. This data is passed as an object so you can use dot notation.

```jsx
const Card = (props) => {
  return (
    <div>
      <h2>{props.name}<h2>
      <p>{props.phone}<p>
      <p>{props.email}<p>
    </div>
  )
}

ReactDOM.render(
  <div>
    <Card name="Bob" phone="555-555-5555" email="bob@mail.com"/>
  </div>
)
```

You can pass props through multiple components.
In the following example we pass along some image data from a contacts array into App.js, through Card.js, to Avatar.js.

```jsx
// App.js

import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

      <!-- here we set the `img` prop to the contact's image url, passing it into the card component -->
      <Card
        name={contacts[0].name}
        img={contacts[0].imgURL}
        tel={contacts[0].phone}
        email={contacts[0].email}
      />
    </div>
  );
}

export default App;
```

```jsx
// Card.js

import React from "react";
import Avatar from "./Avatar"

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>

        <!--Here we take the `img` prop from the Card component and pass it along to the Avatar component -->
        <Avatar img={props.img} />
      </div>
      <div className="bottom">
        <p className="info">{props.tel}</p>
        <p className="info">{props.email}</p>
      </div>
    </div>
  );
}

export default Card;
```

```jsx
// Avatar.js

import React from 'react';

const Avatar = (props) => {
  return (
    // Finally we can take the `img` prop and set it as the image source
    <img className='circle-img' src={props.img} alt='avatar_img' />
  );
};

export default Avatar;
```

## Mapping data to components

```jsx
import React from 'react';
import Card from './Card';
import contacts from '../contacts';

const createCard = (contact) => {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      img={contact.imgURL}
      tel={contact.phone}
      email={contact.email}
    />
  );
};

function App() {
  return (
    <div>
      <h1 className='heading'>My Contacts</h1>
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
```

## Map / filter / reduce / find

map: return array of manipulated items.  
filter: return array all items that return true.
reduce: return accumulated value of all items.
find: return first item that returns true.
findIndex:

### Map

When using array.map(), only pass in the function name but don't call it, or alteratively, directly pass an anonymous function, then .map() will call it.

yes:

```jsx
// yes
//////
const myFunction = (arrayItem) => {
  // do something with item
};
array.map(myfunction);

// yes
//////
array.map((arrayItem) => {
  // do something with item
});

// no
/////
const myFunction = (arrayItem) => {
  // do something with item
};
array.map(myfunction(arrayItem));
```

### Filter

```jsx
array.filter((item) => {
  return; // condition
});
```

### Reduce

```jsx
array.reduce((accumulator, newItem) => {
  return accumulator + newItem;
});
```

### Find

```jsx
array.find((item) => {
  return; // condition
});
```

## Conditional rendering

Render one or the other

```jsx
function App() {
  return <div className='container'>
  <!-- ternary operator -->
  {loggedIn ? <Home /> : <Login />}
  </div>;
}
```

Render one thing based on condition

```jsx
{
  currentTime > 12 ? <h1>Afternoon</h1> : null;
}
```

### &&

The && operator requires both sides to be true, so the right side will only be executed if the left condition returns true.

condition && expression
true && expression
false && !expression

```jsx
{
  currentTime && <h1>Afternoon</h1>;
}
```

Another conditional rendering example:

<https://codesandbox.io/s/react-conditional-login-kpwdt>

Note: the reason to make simple elements like buttons and inputs into components is so that you only have to style the components once as opposed to having to add classes to each and every element separately.

## State

Hooks are essentially functions that allow you to hook into the state of your app to read or modify it.

### Usestate

useState() takes in a single argument, the initial state.  
It return the current state and an update function.

```jsx
// useState(0) sets the initial state to 0
// count is the current state
// setCount is the update function
// in a way you're 'destructuring' the useState hook to get count and setCount
const [count, setCount] = useState(0);

return (
  <div>
    <h1> {count} </h1>
    <button onClick={() => setCount(count + 1)}>+</button>
  </div>
);
```

## Destructuring

When destructuring an array you can use any name.  

```jsx
const animals = [
  {
    name: "cat",
    sound: "mew"
  },
  {
    name: "dog",
    sound: "bork"
  }
]

const [c, d] = animals

console.log(c) // {name: "cat", sound: "mew"}

```

When destructuring an object you have to use the name of the key.  

```jsx
const animals = {
  {
    name: "cat",
    sound: "mew",
    feedingRequirements: {
      food: 2,
      water: 3
    }
  },
  {
    name: "dog",
    sound: "bork"
  }
}

const { cat, dog } = animals
console.log(cat) // {name: "cat", sound: "mew"}

```

Renaming destructured items.  

```jsx
const { name: catName, sound: catSound } = cat
console.log(name) // undefined
console.log(catName) // "cat"
```

You can assign a value to undefined keys.  

```jsx
const bird = {
  sound: "quack"
}

const { name = "chicken" } = bird
console.log(bird.name) // "chicken"
```

Destructuring nested objects.

```js
const {name, sound, feedingRequirements: { food, water }} = cat
console.log(food) // 2
```

Example:

```jsx
import React from "react";
import ReactDOM from "react-dom";

const cars = [
  {
    model: "Honda Civic",
    //The top colour refers to the first item in the array below:
    //i.e. hondaTopColour = "black"
    coloursByPopularity: ["black", "silver"],
    speedStats: {
      topSpeed: 140,
      zeroToSixty: 8.5
    }
  },
  {
    model: "Tesla Model 3",
    coloursByPopularity: ["red", "white"],
    speedStats: {
      topSpeed: 150,
      zeroToSixty: 3.2
    }
  }
];

// first destructure the individual cars from the array
const [honda, tesla] = cars

// then destructure the properties from the object, assigning a new name to the topSpeed property and
// setting <carname>TopColor to the first item in the coloursByPopularity array.
const {speedStats: {topSpeed: hondaTopSpeed}, coloursByPopularity: [hondaTopColour]} = honda
const {speedStats: {topSpeed: teslaTopSpeed}, coloursByPopularity: [teslaTopColour]} = tesla

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);

```

result  

|Brand|Top Speed|Top Colour|
|-----|---------|----------|
|Tesla Model 3|150|red|
|Honda Civic|140|black|

## Event Handling

```jsx
import React, { useState } from "react";

function App() {

  // handle state
  const [ heading, setHeading ] = useState("Hello")
  const [ mousedOver, setMousedOver] = useState(false)

  // change state of heading on click
  const onClick = () => {
    setHeading("Submitted")
  }

  // change state of button color on mouseOver
  const handleMouseOver = () => {
    setMousedOver(!mousedOver)
  }

  return (
    <div className="container">
      <h1>{heading}</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={{backgroundColor: mousedOver ? "black" : "white"}} onClick={onClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>Submit</button>
    </div>
  );
}

export default App;
```

### React Forms & Controlled Components

We handle the state of the user input with `[name, setName]`.  
We get the data the user enters with `e.target.value`.
`onChange` takes this data and uses it to update the state of `name`.
Finally we set the `name` property of the input to value of the input.
This is a controlled component: the value of the element name is the value of the state.
State becomes the 'single source of truth'.

```jsx
import React, { useState } from "react";

function App() {

  // handle state
  const [ name, setName ] = useState("")

  const handleChange = () => {
    setName(e.target.value)
  }

  return (
    <div className="container">
      <h1>{name}</h1>
      <input onChange={handleChange} type="text" placeholder="What's your name?" name={name}/>
      <button onClick={onClick}>Submit</button>
    </div>
  );
}

export default App;
```

#### Form submit

```jsx
import React, { useState } from "react";

function App() {
  const [ heading, setHeading ] = useState("")
  const [name, setName ] = useState("")
  const [ mousedOver, setMousedOver] = useState(false)

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    setHeading(name)
    e.preventDefault()
  }

  return (
    <div className="container">
      <h1>Hello {heading}</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" placeholder="What's your name?" />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
```

## Changing complex state

The old standard way

```jsx
import React, { useState } from "react";

function App() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleChange = (e) => {
    e.target.name === "fName" ? setFirstName(e.target.value) : setLastName(e.target.value)
  }

  return (
    <div className="container">
      <h1>Hello {firstName} {lastName}</h1>
      <form>
        <input onChange={handleChange} value={firstName} name="fName" placeholder="First Name" />
        <input onChange={handleChange} value={lastName} name="lName" placeholder="Last Name" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

```

Keeping state in an object.  
We must assign a constant to the target event name and value, because it is a 'synthetic' event, and cannot be called multiple times. <https://reactjs.org/docs/events.html>

```jsx
import React, { useState } from "react";

function App() {

  const [fullName, setFullName] = useState({
    first: "",
    last: "",
  })

  const handleChange = (e) => {
    const { value, name } = e.target

    name === "fName"
    ?
    setFullName({first: value, last: fullName.last})
    :
    setFullName({first: fullName.first, last: value})
  }

  return (
    <div className="container">
      <h1>Hello {fullName.first} {fullName.last}</h1>
      <form>
        <input onChange={handleChange} value={fullName.first} name="fName" placeholder="First Name" />
        <input onChange={handleChange} value={fullName.last} name="lName" placeholder="Last Name" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
```

Or using prevValue

```jsx
import React, { useState } from "react";

function App() {

  const [fullName, setFullName] = useState({
    first: "",
    last: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    name === "fName"
    ?
    setFullName( (prevValue) => ({ first: value, last: prevValue.last }) )
    :
    setFullName( (prevValue) => ({ first: prevValue.first, last: value }) )
  }

  return (
    <div className="container">
      <h1>Hello {fullName.first} {fullName.last}</h1>
      <form>
        <input onChange={handleChange} value={fullName.first} name="fName" placeholder="First Name" />
        <input onChange={handleChange} value={fullName.last} name="lName" placeholder="Last Name" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
```

## Spread Operator

This:  

```js
function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email
        };
      } else {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value
        };
      }
    });
  };
```

can be reduced to this:  

```js
function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  };
```

We need to add the value that we want in an array syntax, otherwise it is interpreted as a string.  

### Example: todo list

```js
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const onSubmit = (e) => {
    setTodos([...todos, input]);
    setInput("");
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          type="text"
          name="todo"
          placeholder="Todo"
          value={input}
        />
        <button type="submit" onClick={onSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => {
            return <li>{todo}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
```