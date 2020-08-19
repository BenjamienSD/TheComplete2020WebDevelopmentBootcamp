## document object model

# select element, assign variable, manipulate

```html
<html>
  <head>
    ...
  </head>
  <body>
    <h1>
      hello
    </h1>
  </body>
</html>
```

```js
// select & assign
let heading = document.firstElementChild.lastElementChild.firstElementChild;

// manipulate
heading.innerText = 'goodbye';
```

# get, set, go (properties & methods)

object.properties;
object.method();

```js
// get
car.doors; // 4

// set
car.doors = 0;

// go
car.drive();
```
