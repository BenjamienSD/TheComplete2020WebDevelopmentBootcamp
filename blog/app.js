//jshint esversion:6
// imports

const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js')
const _ = require('lodash')
require('dotenv').config()
const url = process.env.mongoURI

// app config 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// schema
const postSchema = new mongoose.Schema({
  day: String,
  date: String,
  title: String,
  content: String
})

// model
const Post = mongoose.model("Post", postSchema)

// routing

// home page
app.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', { postItems: posts })
    }
  })
})

// single post
app.get('/posts/:postId', (req, res) => {
  // if posts array has an object with a title of req.params.postId console.log('match found')
  const postId = req.params.postId

  Post.findOne({ _id: postId }, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', { title: post.title, day: post.day, date: post.date, content: post.content })
    }
  })
})

// about page
app.get('/about', (req, res) => {
  res.render('about', { aboutContent: aboutContent })
})

// contact page
app.get('/contact', (req, res) => {
  res.render('contact', { contactContent: contactContent })
})

// compose page
app.get('/compose', (req, res) => {
  res.render('compose')
})

// posts submission

app.post('/compose', (req, res) => {
  const postDay = date.getDay()
  const postDate = date.getDate()

  const post = new Post({
    day: postDay,
    date: postDate,
    title: req.body.postTitle,
    content: req.body.postBody
  })

  // by putting this callback in the save method we make sure the post is saved before we redirect
  post.save(err => {
    if (!err) {
      res.redirect('/')
    }
  })

})

// port config

let port = process.env.PORT || 3000
if (port === null || port === '') {
  port = 3000
}
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
