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

# Stanford Karel solution

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
