# Connecting to remote database

In mongoDB atlas we create a new cluster.
We connect by copying the URI and storing it in a `.env` file. Make sure to `.gitignore` this file.

`mongoURI=mongodb+srv://<username>:<password>@<clustername>.<serverid>.<host>.mongodb.net/<dbname>?retryWrites=true&w=majority`

Access the environment variable using `dotenv`  

`npm i dotenv`

Then at the top of `app.js`

```js
require('dotenv').config()
const url = process.env.mongoURI

// create database
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

Configure ports  

```js
let PORT = process.env.PORT;
if (PORT === null || PORT === "") {
  PORT = 3000
}
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
```

## Deploy to Heroku

Add a Heroku Git remote.  

`git init`  
`git add .`  
`git commit -m "initial commit"`  

`heroku login`  
`heroku create <appname>`

Make sure to add the mongoURI to the Heroku config vars  
<https://devcenter.heroku.com/articles/config-vars>

Add a Procfile in project root.  

`touch Procfile`  
`nano Procfile`

Add the following line and save Procfile.  

`web: node app.js`  

Specify version of node in package.json  

```json
"engines": {
  "node": "12.16.1"
}
```

`git add .`  
`git commit -m "config"`  
`git push heroku master`  
