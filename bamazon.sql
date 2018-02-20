CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	ID INTEGER(100) NOT NULL AUTO_INCREMENT,
	item_id INTEGER(100) NOT NULL,
	product_name VARCHAR(20),
	department_name VARCHAR(25), 	
	price INTEGER(5),
	stock_quantity INTEGER(5),
	PRIMARY KEY (ID)
);

