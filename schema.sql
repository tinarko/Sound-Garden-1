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
  user_id varchar(255) NOT NULL,
  goalvalue decimal(7,2),
  actualvalue decimal(7,2),
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

INSERT INTO users (userid, name) VALUES ('1', 'Chris'); 
INSERT INTO budgets (id, user_id, month, goalvalue, actualvalue) VALUES (1, '1', NOW(), 600.00, 250.00);
INSERT INTO budgets (id, user_id, month, goalvalue, actualvalue) VALUES (2, '1', '2017-03-08 14:41:50', 1000, 700);
INSERT INTO categorytypes (id, name) VALUES (1, 'Restaurants');
INSERT INTO categorytypes (id, name) VALUES (2, 'Fast Food');
INSERT INTO categorytypes (id, name) VALUES (3, 'Coffee Shop');
INSERT INTO categorytypes (id, name) VALUES (4, 'Groceries');
INSERT INTO categorytypes (id, name) VALUES (5, 'Entertainment');
INSERT INTO categorytypes (id, name) VALUES (6, 'Travel');
INSERT INTO categorytypes (id, name) VALUES (7, 'Other');
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (1, 1, 1, 500.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (2, 1, 2, 400.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (3, 1, 3, 100.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (4, 1, 4, 100.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (5, 1, 5, 50.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (6, 1, 6, 200.00, 0);
INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (7, 1, 7, 500.00, 0);


-- INSERT INTO budgets (id, user_id, month) VALUES (3, '10158485476085052', NOW());
-- INSERT INTO budgets (id, user_id, month) VALUES (4, '10158485476085052', '2017-03-08 14:41:50');

-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (8, 3, 1, 300.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (9, 3, 2, 300.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (10, 3, 3, 300.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (11, 3, 4, 300.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (12, 3, 5, 350.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (13, 3, 6, 300.00, 0);
-- INSERT INTO budgetcategories (id, budget_id, category_id, goalvalue, actualvalue) VALUES (14, 3, 7, 1500.00, 0);



/* */
-- below is dummy data Tina was using. Feel free to remove

INSERT INTO users (userid, name) VALUES (2, 'Tina'); 
INSERT INTO creditcards (userid, ccname, gas, groceries, travel, wholesale) VALUES (2, 'Plaid Diamond 12.5% APR Interest Credit Card', 5, 5, 5, 5);
INSERT INTO creditcards (userid, ccname, gas, groceries, travel, wholesale) VALUES (2, 'Test', 1, 2, 3, 5);







