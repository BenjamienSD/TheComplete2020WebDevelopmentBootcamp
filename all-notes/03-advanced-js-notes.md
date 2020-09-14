# Event listeners

```js
document.querySelector('button').addEventListener('click', handleClick);

// if we were to use parentheses in the handleClick eventListener it would execute a method call as soon as the eventListener is added instead of on click.

function handleClick() {
  alert('clicked');
}
```

or you could put `onclick="handleClick()"` as a button attribute instead of using querySelector.

## event listener with anonymous function

```js
document.querySelector('button').addEventListener('click', function () {
  alert('clicked');
});
```

## adding multiple eventListeners with a loop

```js
let allButtons = document.querySelectorAll('.drum').length;

for (i = 0; i < allButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleClick);
}

function handleClick() {
  alert('clicked');
}
```

# Higher order functions

function that accepts a function as input

```js
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mult(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

function percentOf(a, b) {
  return b * (a / 100);
}

function isPercentOf(a, b) {
  return a + ' is ' + (100 * a) / b + ' percent of ' + b;
}

// higher order function
function calc(op, a, b) {
  return op(a, b);
}

// now we can call the calc function, passing in add, mult, ... as a parameter
calc(add, 9, 8); // 17
```

## 'this'...but not that 'this'

```js
let allButtons = document.querySelectorAll('.drum').length;

for (i = 0; i < allButtons; i++) {
  document.querySelectorAll('.drum')[i].addEventListener('click', handleClick);
}

function handleClick() {
  console.log(this);
}

// returns the button object that triggered the event
```

# Objects

```js
// creating a single object
let objectName = {
  property1: 'value1',
  property2: 'value2',
};
```

```js
// creating a multiple objects using a constructor function (note capitalization)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person('Bob', 20);

console.log(person1); // { name: "Bob", age: 20 }
```

# Methods

```js
let person1 = {
  name: 'Bob',
  age: 90,
  greeting: function () {
    alert(`Hello my name is ${this.name}`);
  },
};

// calling the method

person1.greeting(); // Hello my name is Bob
```

## Incorportating methods in constructor functions

```js
// using anonymous function

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greeting = function () {
    alert(`Hello my name is ${this.name}`);
  };
}

let person1 = new Person('Bob', 90);

// calling the method

person1.greeting(); // Hello my name is Bob

// using named function

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greeting = personalGreeting;
}

function personalGreeting() {
  alert(`Hello my name is ${this.name}`);
}

let person1 = new Person('Bob', 90);
```

# Event

add eventListener to document for keydown

```js
document.addEventListener('keydown', handleKey);

function handleKey(event) {
  console.log(event); //keydown { target: body, key: "a", charCode: 0, keyCode: 65 }
}
```

# Callbacks

is the term used for the function that is passed as a parameter in a higher order function

```js
function someEventListener(EventThatIsListenedFor, callback) {
  // Detect event code, create event object
  let eventThatHappened = {
    eventType: 'keydown',
    key: 'p',
    duration: 2,
  };

  if (eventThatHappened.eventType === EventThatIsListenedFor) {
    callback(eventThatHappened);
  }
}

function callbackFunction(event) {
  console.log(event);
}

document.someEventListener('keydown', callBackFunction);
```
