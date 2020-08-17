## Basic JS

# Strings

## slice

```js
variable.slice(starting index, up to but not including)

// example
alert(prompt("enter tweet: ").slice(0, 141))
```

capitalize using slice & toUpperCase()

```js
alert(
  'Hello ' +
    name.slice(0, 1).toUpperCase() +
    name.slice(1, name.length).toLowerCase()
);
```

## Functions

# Stanford Karel chessboard solution

```js
function unEvenRow() {
  while (frontIsClear()) {
    putBeeper();
    move();
    move();
  }
}

function evenRow() {
  while (frontIsClear()) {
    move();
    putBeeper();
    move();
  }
}

function toLeft() {
  putBeeper();
  turnLeft();
  move();
  turnLeft();
}

function toRight() {
  turnRight();
  move();
  turnRight();
}

function main() {
  while (frontIsClear() || leftIsClear()) {
    unEvenRow();
    toLeft();
    evenRow();
    toRight();
  }
}
```

# Parameters and Arguments

```js
function myFunction(param1, param2) {
  // do something
  // param1 = arg1, param2 = arg2
}

myFunction(arg1, arg2);
```

```js
function multiply(firstNum, secondNum) {
  console.log(firstNum * secondNum);
}

multiply(5, 2);

// 10
```

# Return and Output

```js
let price = 1.5;

function getMilk(budget) {
  let bottles = Math.floor(budget / price);
  console.log(`Got ${bottles} bottles of milk`);
  return budget % price;
}

let change = getMilk(5); // change = return of getMilk(5)

console.log(`Got ${change} dollars in change.`);

// Got 3 bottles of milk
// Got 0.5 dollars in change.
```

## Intermediate JS

# Arrays

```jsx
let guestNames = ['Angela', 'Jack', 'Pam', 'James', 'Lara', 'Jason'];

function isInvited(guestName) {
  if (guestNames.includes(guestName)) {
    return `Welcome, ${guestName}!`;
  } else {
    return 'You are not on the list.';
  }
}

isInvited('Frankie');
```

# fizzbuzz array

```js
let fizzedBuzzed = [];
function fizzBuzz() {
  for (let i = 0; i < 100; i++) {
    if (i % 5 === 0 && i % 3 === 0) {
      fizzedBuzzed.push('fizzbuzz');
    } else if (i % 3 === 0) {
      fizzedBuzzed.push('fizz');
    } else if (i % 5 === 0) {
      fizzedBuzzed.push('buzz');
    } else {
      fizzedBuzzed.push(i);
    }
  }
  console.log(fizzedBuzzed);
}

fizzBuzz();
```

# Who's buying lunch?

```js
let names = ['Angela', 'Jack', 'Pam', 'James', 'Lara', 'Jason'];

function whosPaying(names) {
  let lucky = names[Math.floor(Math.random() * names.length)];
  return lucky;
}
```

# 99 bottles

```js
function neinNein() {
  let i = 99;
  while (i > 0) {
    console.log(
      `${i} bottles of beer on the wall, ${i} bottles of beer. Take one down and pass it around, ${
        i - 1
      } bottles of beer on the wall.`
    );
    i--;
  }
}

neinNein();
```
