// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// init app
const app = express();

app.set('view engine', 'ejs');

// body parser & static folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// session config
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// init passport & session
app.use(passport.initialize());
app.use(passport.session());

// connect DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// SCHEMAS
// user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// secret
const secretSchema = new mongoose.Schema({
  secret: String,
});

// MODELS
// user
const User = new mongoose.model('User', userSchema);

// secret
const Secret = new mongoose.model('Secret', secretSchema);

// passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// ROUTES
// home
app.get('/', (req, res) => {
  res.render('home');
});

// register
app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
      if (err) {
        console.log(err.message);
        res.redirect('/register')
      } else {
        console.log('user registered');
        passport.authenticate("local")(req, res, () => {
          console.log('user authenticated');
          res.redirect('/secrets')
        }
        )
      }
    })
  });

// login
app
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post((req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
    req.login(user, err => {
      if (err) {
        console.log(err.message);
      } else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/secrets')
        })
      }
    })
  });

// secrets
app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets')
  } else {
    res.redirect('/login')
  }
})

// submit
app.post('/submit', (req) => {
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

// logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})

// PORT
// port config
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
