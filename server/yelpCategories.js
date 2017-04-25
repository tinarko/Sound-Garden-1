require('isomorphic-fetch');
require('es6-promise').polyfill();

var Wrapper = function () {  
  this.yelpCategories = {};
}

Wrapper.prototype.init = (cb) => {
  fetch('https://www.yelp.com/developers/documentation/v2/all_category_list/categories.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    })
    .then(response => {
      return response.json();
    })
    .then((yelpJSON) => { 
      var yelpCategories = {};
      var yelpAlias;
      var cashbackAlias;

      yelpJSON.forEach(obj => { 
        yelpAlias = obj.alias;
        parentAlias = obj.parents[0]; // TODO: iterate through multiple parents
        cashbackAlias = setCashbackAlias(yelpAlias, parentAlias);
        yelpCategories[yelpAlias] = cashbackAlias;
      });
      
      cb(yelpCategories);
    })
    .catch((err) => {
      console.log('error in get', err);
    });
}

var setCashbackAlias = (yelpAlias, parentAlias) => {
  var cashbackAlias = parentAlias;

  // based on yelp alias or yelp's parent alias, set the "parentAlias" to match existing known cashback categories
  // yelp aliases that point to "groceries" cashback category
  var groceriesAlias = ['grocery', 'ethicgrocery', 'intlgrocery'];
  // yelp aliases that point to "wholesale" cashback category
  var wholesaleAlias = ['wholesalers'];
  // yelp aliases that point to "gas" cashback category
  var gasAlias = ['servicestations', 'gasstations'];

  //yelp parent aliases that point to "restaurant" cashback category
  var restarantsParents = ['restaurants', 'african', 'arabian', 'belgian', 'brazilian', 'cafes', 
                           'caribbean', 'chinese', 'french', 'german', 'italian', 'japanese', 
                           'donburi', 'latin', 'malaysian', 'mediterranean', 'mexican','mideastern', 
                           'pierogis', 'portuguese', 'spanish', 'turkish'];
  // yelp parent aliases that point to "travel" cashback category
  var travelParents = ['hotelstravel', 'airports', 'hotels', 'tours', 'transport', 'travelservices'];


  if (wholesaleAlias[0] === yelpAlias) {
    cashbackAlias = 'wholesale';
  } else {
    groceriesAlias.forEach(alias => {
      if (yelpAlias === alias) {
        cashbackAlias = 'groceries';
      }
    });
    gasAlias.forEach(alias => {
      if (yelpAlias === alias) {
        cashbackAlias = 'gas';
      }
    });
    restarantsParents.forEach(alias => {
      if (parentAlias === alias) {
        cashbackAlias = 'restaurants'
      }
    });
    travelParents.forEach(alias => {
      if (parentAlias === alias) {
        cashbackAlias = 'travel'
      }
    });
  }

  return cashbackAlias;
}

module.exports = new Wrapper ();
