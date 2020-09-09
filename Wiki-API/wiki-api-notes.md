# Wiki API notes

## Chained Route Handlers using Express

You can call multiple methods on a single API endpoint by chaining them onto `app.route()`

```js
app.route('/endpoint')
  .method1(callback)
  .method2(callback)
```

```js
app.route('/articles')
// GET all
  .get((req, res) => {
    Article.find({}, (err, articles) => {
      if (err) {
        console.log(err);
      } else {
        res.send(articles);
      }
    }
    );
  });
// POST new
  .post((req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  })
  article.save(err => {
    if (!err) {
      console.log('article successfully added')
      res.redirect('/articles')
    }
  })
})
```
