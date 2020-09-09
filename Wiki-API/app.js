// IMPORTS
//////////
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// APP CONFIG
/////////////
// init app
const app = express();

// set view engine
app.set('view engine', 'ejs');

// body parser & static folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect DB
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// model
const Article = mongoose.model('Article', articleSchema);

// API ROUTING
//////////////
// all articles
app.route('/articles')
  // GET
  .get((res) => {
    Article.find({}, (err, articles) => {
      if (err) {
        console.log(err);
      } else {
        res.send(articles);
      }
    }
    );
  })
  // POST
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
  });

// single article
app.route('/articles/:articleTitle')
  // GET
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, article) => {
      if (err) {
        console.log(err);
      } else if (article) {
        res.send(article);
      } else {
        res.send('Nothing here...')
      }
    }
    );
  })
  // PUT
  .put((req, res) => {
    Article.replaceOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content }, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully updated article");
        }
      }
    );
  })
  // PATCH
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully patched article");
        }
      }
    );
  })
  // DELETE
  .delete((req) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully deleted article')
      }
    })
  });

// PORT CONFIG
//////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
