//jshint esversion:6
// imports

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js')
const _ = require('lodash')


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// app config 

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = []

// routing

// home page
app.get('/', (req, res) => {
  res.render('home', { postItems: posts })
})

// single post
app.get('/posts/:postId', (req, res) => {
  // if posts array has an object with a title of req.params.postId console.log('match found')
  posts.forEach(post => {
    if (_.lowerCase(req.params.postId) === _.lowerCase(post.title)) {
      res.render('post', { day: post.day, date: post.date, title: post.title, content: post.content })
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
  const newPost = { day: postDay, date: postDate, title: req.body.postTitle, content: req.body.postBody }
  posts.push(newPost)
  res.redirect('/')
})

// port config

const port = 3000 || process.env.PORT

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
