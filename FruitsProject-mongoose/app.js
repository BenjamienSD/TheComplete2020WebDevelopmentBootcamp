// import
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema: blueprint for how the data is structured
const fruitSchema = new mongoose.Schema({
  name: String,
  score: Number,
  review: String,
});

// model (create new collection)
const Fruit = mongoose.model('Fruit', fruitSchema);

// new fruit document
const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'solid',
});

// add document to collection
// fruit.save();

//* Challenge
//* Create a people collection
//* person schema (name, age), person model, person document (John, 37), save person
/*
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
*/

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'John',
  age: 31,
});

const pineapple = new Fruit({
  name: 'Pineapple',
  score: 10,
  review: 'Excellent',
});

pineapple.save();

Person.updateOne({ name: 'John' }, { favouriteFruit: pineapple }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Favourite fruit added.');
  }
});

Person.findOne({ name: 'John' }, (err, person) => {
  if (err) {
    console.log(err);
  } else {
    console.log(person.favouriteFruit);
  }
});
// person.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 10,
  review: 'Excellent',
});
const banana = new Fruit({
  name: 'Banana',
  rating: 9,
  review: 'Great',
});
const grapes = new Fruit({
  name: 'Grapes',
  rating: 8,
  review: 'Good',
});

/*
Fruit.insertMany([kiwi, banana, grapes], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfuly saved all the fruits to fruitsDB');
  }
});
*/

/*
// console.log all fruits
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    console.log(fruits);
  }
});
*/

/*
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
*/
