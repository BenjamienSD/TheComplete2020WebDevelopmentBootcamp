# Newsletter Sign Up page

## Serving up static pages with express

```js
app.use(express.static('public'));
```

Create a folder 'public' containing all the static assets, like css and images
Then link relative to public

```html
<link href="css/styles.css" rel="stylesheet" />
<img class="mb-4" src="images/logo.png" alt="" width="72" height="72" />
```

## Set up environment variables

`npm i dotenv`

```js
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.url; // url='<url>' in .env file or config vars in heroku
const auth = process.env.auth; // auth='<username:apikey>' in .env file or config vars in heroku
```

## Deploying to heroku

add Procfile

```procfile
web: node app.js
```

deploy

```commandline
heroku login

heroku create

git init

git add . && git commit -m "preparing for deploy"

heroku git:remote -a <heroku appname>

git push heroku master
```
