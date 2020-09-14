# Authentication and Security

• level 1: Register users with username and password  
• level 2: Database encryption  
• level 3: Hashing passwords  
• level 4: Salting and hashing passwords with bcrypt  
• level 5: Using Passport.js to add cookies and sessions  
• level 6: OAuth 2.0 & Google sign in  

## LEVEL 1

### Register users with username and password

This is just to demonstrate how to add and search for users in the database. As it stores the passwords in plain text this is for demonstration purposes only.

```js
// LOGIN
app.route('/login')
  .get((req, res) => {
    res.render('login')
  })
  .post((req, res) => {
    User.findOne({ email: req.body.username }, (err, user) => {
      if (err) {
        res.send(err);
      } else if (user.email === req.body.username && user.password === req.body.password) {
        //res.send(`found ${user.email}`);
        res.render('secrets')
      } else {
        //res.send('Invalid credentials')
        res.redirect('/login')
      }
    })
  })

// REGISTER
app.route('/register')
  .get((req, res) => {
    res.render('register')
  })
  .post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
    })
    User.findOne({ email: req.body.username }, (err, user) => {
      if (err) {
        console.log(err)
      } else if (!user) {
        newUser.save(err => {
          if (err) {
            res.send(err)
          } else {
            //res.send('User successfully added')
            res.render('secrets')
          }
        })
      } else if (user.email === newUser.email) {
        //res.send('This user already exists')
        res.redirect('/register')
      }
    })
  })

```

## LEVEL 2

### Database encryption

<https://www.npmjs.com/package/mongoose-encryption>

`npm i mongoose-encryption`

You can add functionality to mongoose schemas with plugins like mongoose-encryption.  
During `save()` documents are encrypted, during `find()` they are decrypted.  
`find` works transparently (though you cannot query fields that are encrypted).  
In this case, instead of using 2 keys (encryption & signing) we will use a single secret string.  

You have to add the encrypt plugin to the schema before you create the model, that way when you reference the schema parameter in the model, encrypt is included.

We store the secret in the `.env` file in the project root directory. Make sure to add `.env` to `.gitignore` to make sure it is not added to version control (we've all done it).  

```env
SECRET=someSuperLongUnguessableString
```

```js
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, { secret: process.env.SECRET });

const User = new mongoose.model('User', userSchema);
```

Doing it like this encrypts the entire database, in orde to be able to search for email or usernames, you have to exclude to fields using options.  

```js
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });
```

## LEVEL 3

### Hashing passwords

<https://crackstation.net/hashing-security.htm>

Right now the weakest link is the encryption key, i.e., the secret.  

Hash functions are mathematical equations which are designed to make it almost impossible to go backwards from hashed password to plaintext.  
When a user registers, the password is converted into a hashed string and stored in the database. Then when the user logs in with their password, that password is hashed as well using the same hash function. Then it simply a matter of comparing the 2 hashed strings against eachother.  

In short, since the login and register password are the same string, they result in the same hash.

In this case we will be using md5 (128 bit).  

`npm i md5`

```js
// register
.post((req, res) => {
    const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password)
    });
```

```js
// login
else if (
        user.email === req.body.username &&
        user.password === md5(req.body.password)
      )
```

All we have to do here is hash the password during registration using `md5(req.body.password)`. This hashed password is stored as the user password. Then during login we hash the entered login the same way and compare it to the stored hashed password.  

## Hacking 101

Let's say you get access to a database and with it all the hashed passwords. If you know which hash function was used you can now create a 'hash-table' where you hash the most commonly used passwords using that same hash function. Once again it is only a matter of comparing the hashes to see if there is any match. If there is you can simply search the table for the password that matches the hash.

Simple hash table construction:  

- All words from dictionary (~ 150 000)
- All combinations of characters up to 6 places (19 770 609 664)  

Consumer level hardware easily generates upwards of 20 000 000 000 md5 hashes in a matter of seconds

<http://password-checker.online-domain-tools.com>

The difficulty to crack a password increases exponentially with each character added.

## LEVEL 4

### Salting

Salting takes the 'effort' out of creating strong passwords by adding a random set of characters to the password before hashing.  
That way, even if you were to use a dictionary word, because of the added characters the resulting hash can't be found in any dictionary word  hashtable.  

The salt is stored on the database along with the hash.  

There is still the issue that md5 hashes, even including salts, are relatively quick to generate.  
So let's use a different encryption method: bcrypt.  

Hashes per second:  
| md5           | bcrypt  |
|---------------|---------|
|20 000 000 000 |17 000   |

bcrypt also includes something called 'salt rounds', meaning you can salt a hashed password several times over.  

password + salt -> hash + salt -> hash + salt -> hash  

On a 2GHz core:

|rounds|hashes/sec|
|-|-|
|8|40|
|9|20|
|10|10|
|11|5|
|12|3|
|13|1|
|14|0.5|
|15|0.3|
|25|0.00027|
|31|0.0000057 (2 - 3 days per hash)|

### Installing and using bcrypt

`npm i bcrypt`  

If you get the following warning: `node-pre-gyp WARN Using needle for node-pre-gyp https download`, that just means it's downloading the binary to install bcrypt. If you want to get rid of the warning you can do `npm i bcrypt --build-from-source`, though it isn't necessary.  

Using bcrypt during registration.  
`bcrypt.hash()`

```js
const bcrypt = require('bcrypt')
const saltRounds = 10

// register
bcrypt.hash(req.body.Password, saltRounds, (err, hash) => {
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
});
```

Using bcrypt during login.  
`bcrypt.compare()`

```js
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
```

## LEVEL 5

### Cookies and Sessions using Passport.js

#### Setup and config

`npm i passport passport-local passport-local-mongoose express-session`  

First we get the app to use the session package, then we configure the session with `app.use(session())`.  
Next we get the app to use passport, initialize it: `app.use(passport.initialize());` and get passport to handle the session with `app.use(passport.session());`.

We use passportLocalMongoose as a plugin to hash and salt the password.

```js
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

// ...

// body parser & static folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// session config (before DB connection, after other app.use)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// connect DB
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// schemas
// user
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

// models
// user
const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ...
```

- resave: forces the session to be saved back to the session store, even if the session was never modified during the request.  
- saveUninitialized: forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie.  
- createStrategy: local strategy to authenticate users using their username and password.  
- (de)serializeUser: used by sessions to write the user's identification in the session cookie (serialize) and to read the identification (deserialize).  

If you get the warning: `DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.` make sure to include `{ useCreateIndex: true }` in `mongoose.connect()`

#### Registering a user

The `.register()` and `.authenticate()` methods come from the `passport-local-mongoose` package.  
`res.redirect('/secrets')` only happens when `passport.authenticate()` passes.
`"local"` indicates the type of authentication.

```js
User.register({username}, password, callback())
```

```js
passport.authenticate("type")(callback())
```

```js
// REGISTER
app
  .route('/register')
  .get((req, res) => {
    res.render('register');
  })
  .post((req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
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
```

Note: I changed `email` to `username` because the passport-local-mongoose username field defaults to username. You could use a plugin to change that if you wanted to.

```js
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
```

From the docs:  
`User.plugin(passportLocalMongoose, options);`
usernameField: specifies the field name that holds the username. Defaults to 'username'. This option can be used if you want to use a different field to hold the username for example "email".  
<https://github.com/saintedlama/passport-local-mongoose#options>

Before this we didn't have a secrets route, we just rendered the secrets page when the user was registered or logged in. Now that we do redirect we need to create the route.  
In this route we have to do authentication to make sure that the user should be allowed access to the route.

```js
// SECRETS
app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets')
  } else {
    res.redirect('/login')
  }
})
```

#### Logging in a user

```js
// LOGIN
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
```

#### Logging out a user

```js
// LOGOUT
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/')
})
```

## LEVEL 6

### OAuth 2.0 & Google sign in

OAuth: Open Authorization.  
An open standard for token based authorization.  

This basically allows you to delegate the task of securing a users login information to a third party, like Google of Facebook.  
When a user wants to register on our website, we can ask if they want to register using Google. We then send Google a request to authenticate the user for us.

OAuth:

- granular access
- Read / Read+Write access
- Revoke access

`npm install passport-google-oauth20`

#### Consent screen

We now have to register the application with Google on <https://console.developers.google.com>  
Create a new project, in this case it is named `Secret`. Then we go to login credentials and configure the consent screen.  
Set it to `external` so the application is available to anyone with a Google account.

#### API Credentials

Navigate to APIs & Services > Credentials and create credentials.  
Here we choose to create a OAuth client ID. Set the Application type to web application, the name is Secrets.  

For now we set the authorised JavaScript origins to `http://localhost:3000`
The authorized redirect URI is `http://localhost:3000/auth/google/secrets`  

When you create the credentials you will receive a client ID and a client Secret, put this in the `.env` file.

#### Implementation

<https://github.com/jaredhanson/passport-google-oauth2>

We include the `userProfileURL` in the strategy options to direct where to get the user info from.  
`.findOrCreate()` isn't actually a mongoose method. It is pseudo placeholder code provided by the documentation.  
There is however a npm package `mongoose-findorcreate` which actually makes it work.

```js
const GoogleStrategy = require('passport-google-oauth20').Strategy;

userSchema.plugin(findOrCreate);

// put this below (de)serialize user
passport.use(new GoogleStrategy({
  // options
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  // verify callback
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

TODO: figure out what `cb` is.

#### Connecting the front end

Sign in/up button

```html
    <div class="col-sm-4">
      <div class="card">
        <div class="card-body">
          <a class="btn btn-block" href="/auth/google" role="button">
            <i class="fab fa-google"></i>
            Sign Up with Google
          </a>
        </div>
      </div>
    </div>
```

Create the `/auth/google` route
Here we are saying to use passport to authenticate the user using the `google` strategy, and asking to get the user's profile.  

```js
// google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
)
```

Then we set up the authorised redirect url

```js
// google redirect route
app.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/secrets')
  }
)
```

The following only works for a local strategy  

```js
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

In order to get it to work with all strategies it has to be amended.  

```js
passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
});
```

At the moment our users only have 2 fields, username and password. In order to associate their user id on our database with their Google sign in id we have to add another field.

```js
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
});
```

#### Styling the social buttons

<https://lipis.github.io/bootstrap-social/>

Just download and add the `bootstrap-social.css` to your css folder.  

<https://developers.google.com/identity/sign-in/web/sign-in> also provides a way to automatically render a sign in button.  

#### Letting the user to submit secrets

Amend the user schema to include a secret

```js
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String
});
```

Submit funtionality

```js

// submit
app.route('/submit')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.render('submit')
    } else {
      res.redirect('/login')
    }
  })
  .post((req, res) => {
    const newSecret = req.body.secret;
    // find the user that submitted the secret
    User.findById(req.user.id, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (user) {
          user.secret = newSecret
          user.save(err => {
            if (!err) {
              res.redirect('/secrets')
            }
          });
        }
      }
    });
  });
```

Now when someone gets access to the secrets page it displays the secrets submitted by all users

```js
// secrets
app.get('/secrets', (req, res) => {
  User.find({ 'secret': { $ne: null } })
})
```

This is what was done in the course, however this allows the user only 1 secret, so I changed it to an array of secrets.  
I might add the functionality to delete secrets later, once I'm done with the course.

```js
// user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  secrets: Array
});

// secrets
app.get('/secrets', (req, res) => {
  User.find({ 'secrets': { $exists: true, $ne: [] } }, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      const userSecrets = []
      users.forEach(user => {
        user.secrets.forEach(secret => {
          userSecrets.push(secret)
        })
      })
      res.render('secrets', { secrets: userSecrets })
    }
  });
});

// submit
app.route('/submit')
  .get((req, res) => {
    if (req.isAuthenticated()) {
      res.render('submit')
    } else {
      res.redirect('/login')
    }
  })
  .post((req, res) => {
    const newSecret = req.body.secret;
    // find the user that submitted the secret
    User.findById(req.user.id, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (user) {
          user.secrets.push(newSecret)
          user.save(err => {
            if (!err) {
              res.redirect('/secrets')
            }
          });
        }
      }
    });
  });
```

Then in the secrets view.  

```html
    <% secrets.forEach(secret => { %>
    <p class="secret-text"><%=secret%></p>
    <% }) %>
```