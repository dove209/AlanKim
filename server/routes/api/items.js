var express = require('express');
var router = express.Router();

// Item Model
const Item = require('../../models/Item');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Item.find({name:'kildong'})
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(500).send(err));
});

router.post('/', function(req, res, next) {
  Item.create(req.body.addListItem)
    .then(items => res.status(200).send(true))
    .catch(err => res.status(500).send(err));

});

module.exports = router;


