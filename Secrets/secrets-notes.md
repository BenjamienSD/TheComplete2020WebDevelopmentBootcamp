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
