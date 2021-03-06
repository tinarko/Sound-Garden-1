var wrapper = require ('./yelpCategories.js');

var calculateBestCard = (userCats, bizCats, cb) => {

  return wrapper.init( (yelpCategories) => {

    var yelpAlias, userCat, cashbackCat, yelpCashbackCats, userCashbackCat;
    var maxCashbackPercent = 0;
    var maxCashbackIndex = 0;

    // check all yelp business categories
    bizCats.forEach( bizCat => {
      yelpAlias = bizCat.alias;
      // check all yelp parent categories
      yelpCashbackCats = yelpCategories[yelpAlias];
      yelpCashbackCats.forEach((yelpCashbackCat) => {
        // check all credit cards cashback categories
        userCats.forEach ( (userCat, index) => {
          userCashbackCat = userCat.categoryname.toLowerCase();
          // check through all cashback categories where the yelp names match with the cc cashback names
          if ( userCashbackCat === yelpAlias || userCashbackCat === yelpCashbackCat ||
               userCashbackCat === 'grocery' && yelpCashbackCat === 'groceries' ||
               userCashbackCat === 'grocery stores' && yelpCashbackCat === 'groceries' ||
               userCashbackCat === 'supermarket' && yelpCashbackCat === 'groceries' ||
               userCashbackCat === 'wholesale stores' && yelpCashbackCat === 'wholesale' ||
               userCashbackCat === 'restaurant' && yelpCashbackCat === 'restaurants' || 
               userCashbackCat === 'everything' || userCashbackCat === 'everything else') {
            if (userCat.value > maxCashbackPercent) {
              maxCashbackIndex = index;
              maxCashbackPercent = userCat.value;
            }
          }
        });
      });
    });

    var maxCC = userCats[maxCashbackIndex].ccname;
    var maxCat = userCats[maxCashbackIndex].categoryname;
    var results = [maxCC, maxCashbackPercent, maxCat];
    console.log(results);
    return cb(results);
  });
}


module.exports = calculateBestCard;
