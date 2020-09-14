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

# selectors

```js
document.getElementById('#id');
// returns a single object, can be directly manipulated

document.getElementsByClassName('btn');
// returns an array of objects, manipulation requires further specification

document.getElementsByClassName('btn')[n];
// select the 'nth' element with the class of 'btn'

document.querySelector('li a');
// select the anchor tag nested within the list element

document.querySelector('li.item');
// select the list element with the class of item

document.querySelectorAll('#list .item');
// select all list item with the class of item inside the list element with the id of list
```

# add, remove, toggle classes

```js
document.querySelector('button').classList.add('invisible');
// add the class to the object. Whatever modifications are made in the CSS will then be applied

document.querySelector('button').classList.remove('invisible');

document.querySelector('button').classList.toggle('invisible');
// if class is present: remove, else add
```

# textContent & innerHTML

```html
<h1><strong>Hello</strong></h1>
```

```js
document.querySelector('h1').textContent;
// Hello

document.querySelector('h1').innerHTML;
// <strong>Hello</strong>
```

# attributes

```js
document.querySelector('a');
// <a href="google.com">Google</a>

document.querySelector('a').getAttribute('href');
// "google.com"

document.querySelector('a').setAttribute('href', 'bing.com');
// <a href="bing.com">Google</a>
```
