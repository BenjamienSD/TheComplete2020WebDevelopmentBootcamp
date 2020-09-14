# Selecting elements

```js
document.querySelector('h1')        => $('h1')
document.querySelectorAll('button') => $('button')
```

# Manipulating styles

## inline

```js
console.log($('h1').css('color');) // rgb (0,0,0)

$('h1').css('color', 'red');
$('button');
```

## stylesheet

```css
.big-title {
  color: red;
  font-size: 3rem;
}

.margin-50 {
  margin: 50px;
}
```

```js
$(h1).addClass('big-title margin-50');
```

## hasClass

```js
$('h1').hasClass('big-title'); // true
```

# Manipulating text

```js
$('h1').text('new text');

$('h1').html('<em>new italic text</em>');
```

# Manipulating attributes

```js
$('img').attr('src'); // src="/images"

$('a').attr('href', 'https://www.google.com');
```

# Event listeners

Vanilla

```js
for (let i = 0; i < 5; i++) {
  document.querySelectorAll('button')[i].addEventListener('click', function () {
    document.querySelector('h1').style.color = 'blue';
  });
}
```

jQuery

```js
$('button').click(function () {
  $('h1').css('color', 'blue');
});
```

## input

```html
<input type="text" />
```

```js
$('input').keydown(function (event) {
  text += event.key;
});
```

## using 'on'

```js
$('h1').on('mouseover', function () {
  $('h1').css('color', 'purple');
});
```

# Adding and removing elements

```js
$('h1').before('<button></button>');
$('h1').after('<button></button>');
```

```js
// insert into element, right after opening tags
$('h1').prepend('<button></button>');

// insert into element, right before closing tags
$('h1').append('<button></button>');
```

```js
$('h1').remove();
```

## animations

```js
$('button').click(function () {
  $('h1').hide();
});

$('button').click(function () {
  $('h1').toggle();
});

// in/out/toggle
$('button').click(function () {
  $('h1').fadeOut();
});

// in/out/toggle
$('button').click(function () {
  $('h1').SlideUp();
});

// numeric value only
$('button').click(function () {
  $('h1').animate({ opacity: 0.5 });
});
```
