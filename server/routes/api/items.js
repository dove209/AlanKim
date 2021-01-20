var express = require('express');
var router = express.Router();

// Item Model
const Item = require('../../models/Item');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Item.find()
  .then(items => res.json(items))
});

module.exports = router;


