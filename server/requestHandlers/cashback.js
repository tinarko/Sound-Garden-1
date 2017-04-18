var db = require('./../../database/index');

exports.changeCashbackPercent = (req, res) => {
  var catid = req.body.catid;
  var percent = req.body.percent;
  var action = req.body.action;

  db.changeCashbackCategories(catid, percent, action, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
};
    
exports.createCashbackCategory = (req, res) => {
  var ccid = req.body.ccid;
  var name = req.body.name;
  var percent = req.body.percent;

  db.createCashbackCategory(ccid, name, percent, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log('results.insertId at reqHandler', results.insertId);
      res.status(200).json(results.insertId);
    }
  });
};

exports.deleteCashbackCategory = (req, res) => {
  var catid = req.params.catid;
  db.deleteCashbackCategory(catid, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};