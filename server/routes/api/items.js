var express = require('express');
var router = express.Router();

var multer = require('multer');

const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});


// Item Model
const Item = require('../../models/Item');

/* GET items(item select) */
router.get('/', function(req, res, next) {
  let sortMenu = Number(req.query.sortMenu);
  let sorttVal = req.query.val;
  let orderIndex = sortMenu === 2 ? 'asc' : 'desc';
  if(sortMenu === 3) {              //위치별
    Item.find({ isScore:false, dong: sorttVal}).sort({upTime: orderIndex})
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err));
  } else if(sortMenu === 4){        //업종별
    Item.find({ isScore:false, storeType: sorttVal }).sort({upTime: orderIndex})
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err));
  } else if (sortMenu === 5) {      //가격대별
    Item.find({ isScore:false, price: sorttVal }).sort({upTime: orderIndex})
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err));
  } else {                          //최신순 or 과거순
    Item.find({isScore:false}).sort({upTime: orderIndex})
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).send(err));
  }
});

router.get('/:_id', function(req, res, next) {
  let _id = req.params._id;
  Item.find({_id :_id})
  .then(item => res.status(200).json(item))
  .catch(err => res.status(500).send(err));
});

/* POST items(item add) */
router.post('/', function(req, res, next) {
  Item.create(req.body.addListItem)
    .then(() => res.status(200).send(true))
    .catch(err => res.status(500).send(err));
});

/* PUT items(item update) */
router.put('/',function(req, res, next){
  Item.updateMany({ _id: req.body._id }, { $set : req.body.addListItem })
    .then(()=>{res.status(200).send(true)})
    .catch(err => res.status(500).send(err));
});

/* PUT item 점수 및 이미지 등록 */ 
router.put('/score', upload.single("photo"), function(req, res, next){
  let file = req.file;
  let QArr = req.body.QArr;
  if(file != undefined){
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
      Item.updateMany({ _id: req.body._id }, { $set :{ QArr : QArr, isScore : true} })
        .then(()=>{res.status(200).send(true)})
        .catch(err => res.status(500).send(err));
    } else {
      res.status(201).send('fileType_err');
    }
  } else {
    Item.updateMany({ _id: req.body._id }, { $set :{ QArr : QArr, isScore : true} })
      .then(()=>{res.status(200).send(true)})
      .catch(err => res.status(500).send(err));
  }
});

/* DELETE items(item delete) */
router.delete('/',function(req, res, next){
  let id = req.query._id;
  Item.deleteOne({ _id: id })
    .then(()=>{res.status(200).send(true)})
    .catch(err => res.status(500).send(err));
});

module.exports = router;


