var Promise = require('bluebird');

module.exports = function(db) {

  console.log('config is ran');
  if (!db.queryAsync) {
    // console.log('db in config', db);
    db.Promise.promisifyAll(db);
  }

  return db.queryAsync('CREATE TABLE IF NOT EXISTS users (\
  userid varchar(255) NOT NULL,\
  name varchar(255),\
  email varchar(255),\
  PRIMARY KEY (userid)\
  );')
  .then( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS budgets (\
      id int NOT NULL AUTO_INCREMENT,\
      user_id varchar(255) NOT NULL,\
      goalvalue decimal(7,2),\
      actualvalue decimal(7,2),\
      month timestamp,\
      PRIMARY KEY (id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS categorytypes (\
      id int NOT NULL AUTO_INCREMENT,\
      name varchar(255),\
      PRIMARY KEY (id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS budgetcategories (\
      id int NOT NULL AUTO_INCREMENT,\
      budget_id int NOT NULL,\
      category_id int NOT NULL,\
      goalvalue decimal(7,2),\
      actualvalue decimal(7,2),\
      PRIMARY KEY (id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS items (\
      id int NOT NULL AUTO_INCREMENT,\
      user_id varchar(255),\
      access_token varchar(255),\
      institution_name varchar(255),\
      PRIMARY KEY(id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS creditcards (\
      id int NOT NULL AUTO_INCREMENT,\
      ccname varchar(255),\
      userid varchar (255),\
      PRIMARY KEY (id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS cccategories (\
      id int NOT NULL AUTO_INCREMENT,\
      categoryname varchar(255),\
      value decimal (18,2) NOT NULL,\
      ccid int NOT NULL,\
      PRIMARY KEY (id)\
      );');
  })
  .then ( () => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS friends (\
      id int NOT NULL AUTO_INCREMENT,\
      user_id varchar(255) NOT NULL,\
      friend_id varchar(255) NOT NULL,\
      PRIMARY KEY (id)\
      );');
  })
  .error ( (err) => {
    //TODO: Error handling
    console.log('ERROR IN CONFIG', err);
  });
};