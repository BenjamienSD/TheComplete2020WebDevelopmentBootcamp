# MONGODB

## MongoDB CRUD

<https://docs.mongodb.com/manual/crud/>

### CREATE

In shell
`mongo`

create database  
`use shopDB`

check which database you're in  
`db`

show databases  
`show dbs`

show collections
`show collections`

populate database
`db.products.insertOne( { id: 1, name: 'Pen', price: 1.20 } )`

### READ

show collection contents
`db.products.find()`

using queries
`db.products.find(name: 'pencil')`

find products where price > 1
`db.products.find({price: {$gt: 1}})`

using projections, find products where price > 1 returning only the name
`db.products.find({price: {$gt: 1}}, {name: 1, _id: 0})`

### UPDATE

add stock column
`db.products.updateOne({_id: 1}, {$set: {stock: 32}})`

```mongo
db.products.updateOne({_id: 4}, {$addToSet: {reviews: {authorName: 'SomeGuy', rating: 2, review: 'Not graphity enough'}}})
```

### DELETE

`db.products.deleteOne({_id: 2})`

## MongoDB relationships

```mongo
db.products.insert({
  _id: 4,
  name: "Graphite",
  price: 1.9,
  stock: 5,
  reviews: [
    {
      authorName: 'Bob',
      rating: 4,
      review: 'Graphite is as graphite does',
    }
  ]
})
```

If you have another collection you can reference other collections

`{orderNumber: 3243, productsOrdered: [1, 2]}`

## MongoDB with Node.JS (Native Driver or ODM)

The driver allows the interaction between the database and the application.

ODM: Object Document Mapper (mongoose)

### Native Driver

```terminal
mkdir myProject
cd myProject
npm init -y
npm i mongodb
```

MongoDB notes continued in FruitsProject.
