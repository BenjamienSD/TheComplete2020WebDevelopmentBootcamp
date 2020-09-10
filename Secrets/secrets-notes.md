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
SECRET=somestring
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
