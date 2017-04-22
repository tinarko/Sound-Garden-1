var Yelp = require('yelp-api-v3');

module.exports.businesses = (req, res) => {

  var lat = req.params.lat;
  var long = req.params.long;

  var yelp = new Yelp({
    app_id: process.env.YELP_APP_ID,
    app_secret: process.env.YELP_APP_SECRET
  });

  yelp.search({
    latitude: lat,
    longitude: long,
    radius: 25,
    limit: 3,
    sort_by: 'distance'
  })
  .then(function (data) {
    res.status(200).json(data);
  })
  .catch(function (err) {
    console.error(err);
    res.sendStatus(400);
  });
};
