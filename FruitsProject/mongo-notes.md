# MongoDB with Node.JS (Native Driver or ODM)

The driver allows the interaction between the database and the application.

ODM: Object Document Mapper (mongoose)

## Native Driver

```terminal
mkdir FruitsProject
cd FruitsProject
touch app.js
npm init -y
npm i mongodb
```

### Creating a new connection to a new database

The assert module provides a way of testing expressions. If the expression evaluates to 0, or false, an assertion failure is being caused, and the program is terminated.

This module was built to be used internally by Node.js.

```js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // Does testing

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});
```

### Adding data

```js
const insertDocuments = (db, callback) => {
  // get the fruits collection (or create it if it doesn't exist)
  const collection = db.collection('fruts');
  // insert documents
  collection.insertMany(
    [
      {
        name: 'Apple',
        score: 8,
        review: 'Great fruit',
      },
      {
        name: 'Orange',
        score: 6,
        review: 'Kinda sour',
      },
      {
        name: 'Banana',
        score: 9,
        review: 'Great stuff',
      },
    ],
    (err, result) => {
      // assert there are no errors
      assert.equal(err, null);
      // assert that there are 3 results
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log('Inserted 3 documents in the collection');
      callback(result);
    }
  );
};
```

Add this function to the connect method

```js
client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  insertDocuments(db, () => {
    client.close();
  });
}
```

When we run `node app.js` we get:

`Connected successfully to server`  
`Inserted 3 documents in the collection`

It is important to note that these are non-fatal assertions, they will not prevent the data from being submitted.

### Retrieving data

Creating the function

```js
const findDocuments = (db, callback) => {
  // get the collection
  const collection = db.collection('documents');
  // find some documents
  collection.find({}).toArray((err, fruits) => {
    assert.equal(err, null);
    console.log('Found the following fruits');
    console.log(fruits);
    callback(fruits);
  });
};
```

Calling the function

```js
findDocuments(db, () => {
  client.close();
});
```
