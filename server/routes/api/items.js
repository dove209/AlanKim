var express = require('express');
var router = express.Router();

// Item Model
const Item = require('../../models/Item');

/* GET items(item SELECT) */
router.get('/', function(req, res, next) {
  // Item.find({name:'kildong'})
  let orderIndex = req.query.sortMenu === '1' ? 'desc' : 'asc';
  Item.find({isMarked:false}).sort({upTime: orderIndex})
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err));
});
router.get('/:_id', function(req, res, next) {
  let _id = req.params._id;
  Item.find({_id :_id})
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).send(err));
});

/* POST items(item ADD) */
router.post('/', function(req, res, next) {
  Item.create(req.body.addListItem)
    .then(() => res.status(200).send(true))
    .catch(err => res.status(500).send(err));
});

router.put('/',function(req, res, next){
  Item.updateMany({ _id: req.body._id }, { $set : req.body.addListItem })
    .then(()=>{res.status(200).send(true)})
    .catch(err => res.status(500).send(err));
});

router.delete('/',function(req, res, next){
  let id = req.query._id;
  Item.remove({ _id: id })
    .then(()=>{res.status(200).send(true)})
    .catch(err => res.status(500).send(err));
});

module.exports = router;


