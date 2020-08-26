# Newsletter Sign Up page

## Serving up static pages with express

```js
app.use(express.static('public'));
```

Create a folder 'public' containing all the static assets, like css and images
Then link relative to public

```html
<link href="css/styles.css" rel="stylesheet" />
<img class="mb-4" src="images/logo.png" alt="" width="72" height="72" />
```
