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

CREATE TABLE users_cctypes (
  id int NOT NULL AUTO_INCREMENT,
  user_id varchar(255) NOT NULL,
  cctype_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cctypes (
  id int NOT NULL AUTO_INCREMENT,
  institution_name varchar(255),
  APR int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cccategories (
  id int NOT NULL AUTO_INCREMENT,
  cccategory_name varchar (255),
  cctype_id int NOT NULL,
  cashback_percent int NOT NULL,
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
INSERT INTO users_cctypes (user_id, cctype_id) VALUES (2, 1);
INSERT INTO users_cctypes (user_id, cctype_id) VALUES (2, 2);
INSERT INTO users_cctypes (user_id, cctype_id) VALUES (2, 3);
INSERT INTO cctypes (id, institution_name, APR) VALUES (1, 'Wells Fargo', 1);
INSERT INTO cctypes (id, institution_name, APR) VALUES (2, 'Bank of America', 2);
INSERT INTO cctypes (id, institution_name, APR) VALUES (3, 'Chase', 3);








