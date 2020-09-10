// imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const encrypt = require('mongoose-encryption')
require('dotenv').config();

// init app
const app = express();

app.set('view engine', 'ejs');

// body parser & static folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect DB
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const secretSchema = new mongoose.Schema({
  secret: String,
});

// models
const User = new mongoose.model('User', userSchema);

const Secret = new mongoose.model('Secret', secretSchema);

// HOME
app.get('/', (req, res) => {
  res.render('home');
});

// LOGIN
app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    User.findOne({ email: req.body.username }, (err, user) => {
      if (err) {
        res.send(err);
      } else if (
        user.email === req.body.username &&
        user.password === req.body.password
      ) {
        //res.send(`found ${user.email}`);
        res.render('secrets');
      } else {
        //res.send('Invalid credentials')
        res.redirect('/login');
      }
    });
  });

// REGISTER
app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password,
    });
    User.findOne({ email: req.body.username }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (!user) {
        newUser.save((err) => {
          if (err) {
            res.send(err);
          } else {
            //res.send('User successfully added')
            res.render('secrets');
          }
        });
      } else if (user.email === newUser.email) {
        //res.send('This user already exists')
        res.redirect('/register');
      }
    });
  });

// SUBMIT
app.post('/submit', (req, res) => {
  const newSecret = new Secret({
    secret: req.body.secret,
  });
  Secret.insertOne({ secret: newSecret }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully added secret');
    }
  });
});

// port config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
