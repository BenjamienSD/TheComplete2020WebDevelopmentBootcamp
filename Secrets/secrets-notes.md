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

<password-checker.online-domain-tools.com>

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

### installing and using bcrypt

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
