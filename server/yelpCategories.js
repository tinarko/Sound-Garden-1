require('isomorphic-fetch');
require('es6-promise').polyfill();

var Wrapper = function () {  
  this.yelpCategories = {};
}

Wrapper.prototype.init = function (cb) {

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
    .then((json) => {        
      var yelpCategories = {};
      
      json.forEach(obj => { 
        yelpCategories[obj.alias] = obj.parents[0]; 
      });

      cb(yelpCategories);
    })
    .catch((err) => {
      console.log('error in get', err);
    });

}

module.exports = new Wrapper ();
