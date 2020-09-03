# SQL

<https://sqliteonline.com/#fiddle-5bbdbaef7288bo2ajn2wly03>

## SQL CRUD

### CREATE

```sql
CREATE TABLE table_name {
  column1 datatype,
  column2 datatype,
  column3 datatype,
}
```

```sql
CREATE TABLE products {
  id INT NOT NULL,
  name STRING,
  price MONEY,
  PRIMARY KEY (id)
}
```

#### Inserting data

Add full data.

```sql
INSERT INTO products
VALUES (1, "pen", 1.20)
```

Add partial data.

```sql
INSERT INTO products (id, name)
VALUES (2, "pencil")
```

### READ

#### Selecting

```sql
SELECT * FROM products;
SELECT name, price FROM 'products;
```

#### Searching

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

```sql
SELECT *
FROM products
WHERE id=1;
```

### UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

```sql
UPDATE products
SET price = 0.80
WHERE id=2;
```

#### Alter table

Add stock column

```sql
ALTER TABLE products
ADD stock INT;
```

Populate stock column

```sql
UPDATE products
SET stock = 32
WHERE id=1
SET stock = 12
WHERE id = 2
```

### DELETE

```sql
DELETE FROM products
WHERE id = 2
```

## Relationships, Foreign Keys, and Inner Joins

### Foreign key and Relationships

primary keys from other tables can be used as foreign keys.
foreign keys can be used to form relationships.

Creating an orders table.

```sql
CREATE TABLE orders (
  id INT NOT NULL,
  order_number INT,
  customer_id INT,
  product_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
  FOREIGN KEY (products_id) REFERENCES products(id)
)
```

Adding an order

```sql
INSERT INTO orders
VALUES (1, 4362, 2, 1)
```

order_id = 1  
order_number = 4362  
customer_id = 2  
product_id = 1

Now we can reference the customer and product tables to see who ordered what

### Joins

### Inner join

Join together the parts of tables where a particular key matches.

```sql
SELECT order.order_number, customers.first_name, customers.last_name, customers.address
FROM orders
INNER JOIN customers ON orders.customers_id = customers.id
```

| order_number | first_name | last_name | address         |
| ------------ | ---------- | --------- | --------------- |
| 1362         | Angela     | Yu        | 12 Sunset Drive |
