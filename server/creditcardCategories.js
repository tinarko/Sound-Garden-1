var yelpCategories = require ('./yelpCategories');

// yelpCategories is an obj with key of yelp alias, value of yelp parent alias

var groceriesAlias = ['grocery', 'ethicgrocery', 'intlgrocery'];

var wholesalerAlias = ['wholesalers'];

var gasAlias = ['servicestations', 'gasstations'];

var restarantsParents = ['restaurants', 'african', 'arabian', 'belgian', 'brazilian', 'cafes', 
                         'caribbean', 'chinese', 'french', 'german', 'italian', 'japanese', 
                         'donburi', 'latin', 'malaysian', 'mediterranean', 'mexican','mideastern', 
                         'pierogis', 'portuguese', 'spanish', 'turkish'];

var travelParents = ['hotelstravel', 'airports', 'hotels', 'tours', 'transport', 'travelservices'];

var calculateBestCard = (userCats, bizCats) => {
  var bizAlias = bizCats[0].alias;// when i have more time, check all bizCats (not just the first one)
  
  var parentAlias = yelpCategories[bizAlias]; // example: restaurants

  var maxCashbackPercent = 0;
  var maxCashbackIndex = 0;
  var ccCatName;
  var value;

  for (var i = 0; i < userCats.length; i++) {
    ccCatName = userCats[i].categoryname.toLowerCase();
    value = userCats[i].value;

    // check ccCatName against yelp alias specific categories
    // GROCERIES
    if (ccCatName === 'groceries' || ccCatName === 'grocery' || ccCatName === 'grocery store' || 
        ccCatName === 'grocery stores' || ccCatName === 'supermarket') {
      for (var g = 0; g < groceriesAlias.length; g++){
        if (groceriesAlias[g] === bizAlias) {
          if (value > maxCashbackPercent) {
            maxCashbackIndex = i;
            maxCashbackPercent = value;
          }
        }
      }
    }
    // WHOLESALE
    else if (ccCatName === 'wholesale' || ccCatName === 'wholesale club' || ccCatName === 'wholesale clubs') {
      if (wholesalerAlias[0] === bizAlias) {
        if (value > maxCashbackPercent) {
          maxCashbackIndex = i;
          maxCashbackPercent = value;
        }
      }
    }
    // GAS
    else if (ccCatName === 'gas' || ccCatName === 'gas station') {
      for (var s = 0; s < gasAlias.length; s++){
        if (gasAlias[s] === bizAlias) {
          if (value > maxCashbackPercent) {
            maxCashbackIndex = i;
            maxCashbackPercent = value;
          }
        }
      }
    }

    // check ccCatName against yelp parent alias specific categories
    // RESTAURANTS
    else if (ccCatName === 'restaurant' || ccCatName === 'restaurants') {
      for (var r = 0; r < restarantsParents.length; r++){
        ('CHECKING OUT RESTAURANT! first with parent type', restarantsParents[r], 'and next with OUR parentAlias', parentAlias);
        if (restarantsParents[r] === parentAlias) {
          if (value > maxCashbackPercent) {
            maxCashbackIndex = i;
            maxCashbackPercent = value;
          }
        }
      }
    }

    else if (ccCatName === 'travel' || ccCatName === 'transportation') {

      for (var t = 0; t < travelParents.length; t++){
        if (travelParents[t] === parentAlias) {
          if (value > maxCashbackPercent) {
            maxCashbackIndex = i;
            maxCashbackPercent = value;
          }
        }
      }
    }

    if (ccCatName === 'everything' || ccCatName === 'everything else') {
      if (value > maxCashbackPercent) {
        maxCashbackIndex = i;
        maxCashbackPercent = value;
      }
    }
  }

  var maxCashbackCard = userCats[maxCashbackIndex].ccname;
  var cashbackCategory = userCats[maxCashbackIndex].categoryname;

  // return businesstype, maxCashback card name, and percent
  return [maxCashbackCard, maxCashbackPercent, cashbackCategory];

}

module.exports = calculateBestCard;
