module.exports.geolocate = (req, res) => {
  var url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_geolocate_apiKey}`;
  request({
    uri: url,
    method: 'POST'
  }, function(error, response, body) {
    if (error) {
      res.send(error);
    } else {
      res.send(body);
    }
  });
};

module.exports.places = (req, res) => {
  console.log(req.body);
  console.log(process.env.GOOGLE_places_apiKey);
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
  var lat = req.body.location.location.lat;
  var lng = req.body.location.location.lng;
  var location = `${lat},${lng}`;
  request({
    uri: url,
    method: 'GET', 
    qs: {
      location: location,
      // radius: '1000', cannot have not radius and rankby
      rankby: 'distance',
      keyword: 'store',
      key: `${process.env.GOOGLE_places_apiKey}`
    },
    qsStringifyOptions: {
      encoding: false
    }
  }, function(error, response, body) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(body);
    }
  });
};