// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const saltRounds = 10

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
// user
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// secret
const secretSchema = new mongoose.Schema({
  secret: String,
});

// models
// user
const User = new mongoose.model('User', userSchema);

// secret
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
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (match === true) {
            res.render('secrets');
          }
        })
      } else {
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
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      const newUser = new User({
        email: req.body.username,
        password: hash
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
    })
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
