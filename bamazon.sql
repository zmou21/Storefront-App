CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	ID INTEGER(100) NOT NULL AUTO_INCREMENT,
	item_id INTEGER(100) NOT NULL,
	product_name VARCHAR(20),
	department_name VARCHAR(25),
	price DECIMAL(10, 2),
	stock_quantity INTEGER(5),
	PRIMARY KEY (ID)
);

USE bamazon_db;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (001, "Toe Pinchers", "Footwear", 12.50, 40);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (002, "Side Plunkers", "Footwear", 25.00, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (003, "Blade Runners", "Footwear", 45.00, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (004, "Rambo Tee", "Men's Clothing", 7.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (005, "Bob's Secret", "Men's Clothing", 28.75, 15);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (006, "Crop Bottom", "Women's Clothing", 4.25, 150);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (007, "Jay's Jewelery", "Women's Clothing", 120.00, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (008, "Jike Nordans", "Footwear", 95.00, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (009, "Beerbok 7000", "Footwear", 75.00, 20);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (010, "Curly Jeans", "Kids Clothing", 12.50, 40);

SELECT * FROM products;
