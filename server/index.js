var app = require('./app.js');
var port = process.env.PORT || 1337;

app.listen(port, function() {
  console.log('listening on port ' + port + '!');
});