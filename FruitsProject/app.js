const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); // Does testing

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// CREATE
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect((err) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  findDocuments(db, () => {
    client.close();
  });
});

// ADD
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

// READ

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
