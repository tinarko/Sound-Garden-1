DROP DATABASE IF EXISTS heroku_aa9603bdcb7e15e;

CREATE DATABASE heroku_aa9603bdcb7e15e;

USE heroku_aa9603bdcb7e15e;

CREATE TABLE users (
  userid varchar(255) NOT NULL,
  name varchar(255),
  email varchar(255),
  PRIMARY KEY (userid)
);

CREATE TABLE budgets (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  month timestamp, 
  PRIMARY KEY (id)
);

CREATE TABLE categorytypes (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE budgetcategories (
  id int NOT NULL AUTO_INCREMENT,
  budget_id int NOT NULL,
  category_id int NOT NULL,
  goalvalue decimal(7,2),
  actualvalue decimal(7,2),
  PRIMARY KEY (id)
);

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  access_token varchar(255),
  institution_name varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE creditcards (
  id int NOT NULL AUTO_INCREMENT,
  ccname varchar(255),
  userid int NOT NULL,
  gas varchar(255),
  groceries varchar(255),
  travel varchar(255),
  wholesale varchar(255),
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
 
-- below is Dummy Data Chris was using. Feel free to remove

INSERT INTO users (userid, name) VALUES (1, 'Chris'); 
INSERT INTO budgets (id, user_id, month) VALUES (1, 1, NOW());
INSERT INTO categorytypes (id, name) VALUES (1, 'Restaurants');
INSERT INTO categorytypes (id, name) VALUES (2, 'Gas and Transportation');
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (1, 1, 1, 500.00, 200.00);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (2, 1, 2, 100.00, 50.00);

INSERT INTO budgets (id, user_id, month) VALUES (2, 2, NOW());
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (3, 2, 1, 550.00, 200.00);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (4, 2, 2, 150.00, 10.00);


/* */
-- below is dummy data Tina was using. Feel free to remove

INSERT INTO users (userid, name) VALUES (2, 'Tina'); 
INSERT INTO creditcards (userid, ccname, gas, groceries, travel, wholesale) VALUES (2, 'Plaid Diamond 12.5% APR Interest Credit Card', 5, 5, 5, 5);
INSERT INTO creditcards (userid, ccname, gas, groceries, travel, wholesale) VALUES (2, 'Test', 1, 2, 3, 5);







