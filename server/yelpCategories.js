require('isomorphic-fetch');
require('es6-promise').polyfill();

var Wrapper = function () {  
  this.yelpCategories = {};
}

// yelp info from: https://www.yelp.com/developers/documentation/v2/all_category_list

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
      var cashbackAliases;

      yelpJSON.forEach(obj => { 
        yelpAlias = obj.alias;
        var parentAliases = [];
        obj.parents.forEach(parent => {
          parentAliases.push(parent);
        })
        cashbackAliases = setCashbackAlias(yelpAlias, parentAliases);
        yelpCategories[yelpAlias] = cashbackAliases;
      });

      cb(yelpCategories);
    })
    .catch((err) => {
      console.log('error in get', err);
    });
}

// add yelp alias as key, array of self-defined or default parent aliases as value in cashbackAliases object
var setCashbackAlias = (yelpAlias, parentAliases) => {
  var cashbackAliases = parentAliases;

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

  parentAliases.forEach((parent, index) => {
    if (wholesaleAlias[0] === yelpAlias) {
      cashbackAliases[index] = 'wholesale';
    } else {
      groceriesAlias.forEach(alias => {
        if (yelpAlias === alias) {
          cashbackAliases[index] = 'groceries';
        }
      });
      gasAlias.forEach(alias => {
        if (yelpAlias === alias) {
          cashbackAliases[index] = 'gas';
        }
      });
      restarantsParents.forEach(alias => {
        if (parentAliases[index] === alias) {
          cashbackAliases[index] = 'restaurants'
        }
      });
      travelParents.forEach(alias => {
        if (parentAliases[index] === alias) {
          cashbackAliases[index] = 'travel'
        }
      });
    } 
  });
  return cashbackAliases;
}

module.exports = new Wrapper ();
