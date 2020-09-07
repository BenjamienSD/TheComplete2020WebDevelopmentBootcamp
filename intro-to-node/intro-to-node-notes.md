# Node.js

• Allows for a backend, connecting client and server, written in javascript.  
• Server side scripting.  
• Interact directly with the pc hardware / os.

## filesystem

<https://nodejs.org/api/fs.html>

```js
const fs = require('fs'); // 'import' filesystem module
```

copy

```js
fs.copyFileSync('file1.txt', 'file2.txt');
```

## External Node modules & NPM

`npm init`  
creates package.json

`npm i superheroes`  
installs the 'superheroes' package and includes it as a dependency in package.json

```js
const superheroes = require('superheroes');

const superHero = superheroes.random();
console.log(superHero); // Maestro
```
