# Mongoose

`npm i mongoose`

## CREATE

### Connecting to the database

```js
// import
const mongoose = require('mongoose');
// connect to db
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### Creating a Schema

This creates a scaffold that determines which datatypes correspond to which keys.

```js
const fruitSchema = new mongoose.Schema({
  name: String,
  score: Number,
  review: String,
});
```

### Creating a model

We use the newly created schema to create a model.  
`mongoose.model()` takes in 2 parameters.  
The first is the name of the collection that is going to comply with the schema, the second is the schema.

By convention the first parameter is specified as singular.  
To create a collection called `Fruits`, you pass in `Fruit`. Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method. This method pluralizes the name.

```js
const Fruit = mongoose.model('Fruit', fruitSchema);
```

This creates a constant called `Fruit` which in essence is serves as a standard model (think of it as a blank form) for any new fruit document. These documents are saved in the `Fruits` collection (first parameter) and adhere to the structure established in the `fruitSchema`.

### Creating a document

Now we can create a new document following the structure of the previously established schema.
`new Fruit()` refers to the `Fruit` model

```js
const fruit = new Fruit({
  name: 'Apple',
  score: 7,
  review: 'solid',
});
```

### Saving the document to the collection

```js
fruit.save();
```

### Adding multiple documents

`insertMany()` is a method called on the model. The first parameter is an array of documents, the second parameter is a callback.

```js
const kiwi = new Fruit({
  name: 'Kiwi',
  score: 10,
  review: 'Excellent',
});
const banana = new Fruit({
  name: 'Banana',
  score: 9,
  review: 'Great',
});
const grapes = new Fruit({
  name: 'Grapes',
  score: 8,
  review: 'Good',
});

Fruit.insertMany([kiwi, banana, grapes], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfuly saved all the fruits to fruitsDB');
  }
});
```

## READ

`find()` is called on the model and takes in a callback.

```js
// console.log all fruits
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    console.log(fruits);
  }
});

// console.log the names of the fruits
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
    mongoose.connection.close();
  }
});
```

## Data Validation

Opposed to default native asserts, mongoose validation errors are fatal and data won't be submitted.

```js
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required but was not given'],
  },
  score: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});
```

## UPDATE

Using db.fruits.find() in the mongo shell we find that `banana` has an id of `5f5201be5a4b1f43345535c8`.  
Using the `updateOne()` method, the first parameter we pass is the 'filter', ie. which document to update. The second parameter is the key that needs to be updated. The third parameter is a callback.

```js
Fruit.updateOne(
  { _id: '5f5201be5a4b1f43345535c8' },
  { review: 'Fantastic' },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Entry successfully updated.');
    }
  }
);
```

## DELETE

```js
Fruit.deleteOne({ name: 'Grapes' }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Entry successfully deleted.');
  }
});
```

```js
// Remove all with a score less than equal
Fruit.deleteMany({ score: { $lt: 7 } }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Entries successfully deleted');
  }
});
```

## Relationships

```js
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'John',
  age: 31,
});

person.save();
```

We now have a person called John, age 37, in the collection `people`.  
Mongoose automatically pluralizes the first parameter given to the `.model()` method from 'Person' to 'people'.

Let's give John a favourite fruit.

First we have to update the `personSchema` to include the `favouriteFruit` key.
The relationship is established when we set the datatype of `favouriteFruit` to `fruitSchema`.  
We can now embed a fruit document in a person document.

```js
// update schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});
```

```js
// create fruit
const pineapple = new Fruit({
  name: 'Pineapple',
  score: 10,
  review: 'Excellent',
});

pineapple.save();
```

```js
// update person
Person.updateOne({ name: 'John' }, { favouriteFruit: pineapple }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Favourite fruit added.');
  }
});
```

```js
// check update
Person.findOne({ name: 'John' }, (err, person) => {
  if (err) {
    console.log(err);
  } else {
    console.log(person.favouriteFruit);
  }
});
```
