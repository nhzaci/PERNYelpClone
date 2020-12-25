-- psql -U postgres -> Login as user postgres
-- inside psql console
-- for help \?
-- list dbs \l
-- change db \c <dbName>
-- Create database CREATE DATABASE database_name;
-- list tables \d
-- list table fields \d <tableName>

CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale BOOLEAN
);

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'new york', 3);
INSERT INTO restaurants (id, name, location, price_range) values (124, 'pizza hut', 'vegas', 2);