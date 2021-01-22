var express = require('express');
var router = express.Router();

// Item Model
const Item = require('../../models/Item');

/* GET items(item SELECT) */
router.get('/', function(req, res, next) {
  // Item.find({name:'kildong'})
  let orderIndex = req.query.sortMenu === '1' ? 'desc' : 'asc';
  Item.find().sort({upTime: orderIndex})
    .then(items => res.json(items))
    .catch(err => res.status(500).send(err));
});

/* POST items(item ADD) */
router.post('/', function(req, res, next) {
  Item.create(req.body.addListItem)
    .then(() => res.status(200).send(true))
    .catch(err => res.status(500).send(err));
});

router.delete('/',function(req, res, next){
  let id = req.query._id;
  Item.remove({ _id: id })
    .then(()=>{res.status(200).send(true)})
    .catch(err => res.status(500).send(err));
});

module.exports = router;


