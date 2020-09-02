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
SELECT * FROM products
SELECT name, price FROM 'products
```

#### Searching

```sql
SELECT column1, column2
FROM table_name
WHERE condition
```

```sql
SELECT *
FROM products
WHERE id=1
```
