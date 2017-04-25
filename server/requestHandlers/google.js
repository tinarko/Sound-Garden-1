var request = require('request');

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
