var express = require('express');
var router = express.Router();

var multer = require('multer');

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
router.get('/', function (req, res, next) {
  let isScore = req.query.isScore;
  let sortMenu = Number(req.query.sortMenu);
  let sorttVal = req.query.val;
  let orderIndex = sortMenu === 2 ? 'asc' : 'desc';
  if (sortMenu === 3) {              //위치별
    Item.find({ isScore: isScore, dong: sorttVal }).sort({ upTime: orderIndex })
      .then(items => res.status(200).json(items))
      .catch(err => res.status(500).send(err));
  } else if (sortMenu === 4) {        //업종별
    Item.find({ isScore: isScore, storeType: sorttVal }).sort({ upTime: orderIndex })
      .then(items => res.status(200).json(items))
      .catch(err => res.status(500).send(err));
  } else if (sortMenu === 5) {      //가격대별
    Item.find({ isScore: isScore, price: sorttVal }).sort({ upTime: orderIndex })
      .then(items => res.status(200).json(items))
      .catch(err => res.status(500).send(err));
  } else if (sortMenu === 1 || sortMenu === 2) { //최신순 or 과거순
    Item.find({ isScore: isScore }).sort({ upTime: orderIndex })
      .then(items => res.status(200).json(items))
      .catch(err => res.status(500).send(err));
  } else if (sortMenu === 6) {                    //점수순
    Item.find({ isScore: isScore }).sort({ totalScore: 'desc' })
      .then(items => res.status(200).json(items))
      .catch(err => res.status(500).send(err));
  }
});

router.get('/:_id', function (req, res, next) {
  let _id = req.params._id;
  Item.find({ _id: _id })
    .then(item => res.status(200).json(item))
    .catch(err => res.status(500).send(err));
});


/* POST items(item add) */
router.post('/', function (req, res, next) {
  Item.create(req.body.addListItem)
    .then(() => res.status(200).send(true))
    .catch(err => res.status(500).send(err));
});

/* PUT items(item update) */
router.put('/', function (req, res, next) {
  Item.updateMany({ _id: req.body._id }, { $set: req.body.addListItem })
    .then(() => { res.status(200).send(true) })
    .catch(err => res.status(500).send(err));
});

/* PUT item 이미지 등록 */
router.put('/image', upload.single("photo"), function (req, res, next) {
  let file = req.file;
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
    res.status(200).send(true)
  } else {
    res.status(201).send('fileType_err');
  }
});

/* PUT item 점수 등록 */
router.put('/score', function (req, res, next) {
  let categoryScoreArr = [0, 0, 0, 0]  //상권점수, 인테리어점수, 서비스점수, 맛점수
  let totalScore = 0;
  let QArr = req.body.QArr;

  QArr.forEach(ele => {
    switch (ele.Q_num) {
      case 1:
        categoryScoreArr[0] += ele.Q_score*4;
        break
      case 2:
        categoryScoreArr[0] += ele.Q_score*3;
        break
      case 3:
        categoryScoreArr[0] += ele.Q_score*3;
        break
      case 4:
        categoryScoreArr[1] += ele.Q_score*2;
        break
      case 5:
        categoryScoreArr[2] += ele.Q_score*2;
        break
      case 6:
        categoryScoreArr[2] += ele.Q_score*2;
        break
      case 7:
        categoryScoreArr[1] += ele.Q_score*4;
        break
      case 8:
        categoryScoreArr[2] += ele.Q_score*3;
        break
      case 9:
        categoryScoreArr[2] += ele.Q_score;
        break
      case 10:
        categoryScoreArr[2] += ele.Q_score*2;
        break
      case 11:
        categoryScoreArr[1] += ele.Q_score*2;
        break
      case 12:
        categoryScoreArr[1] += ele.Q_score*2;
        break
      case 13:
        categoryScoreArr[3] += ele.Q_score*4;
        break
      case 14:
        categoryScoreArr[3] += ele.Q_score*8;
        break
      case 15:
        categoryScoreArr[3] += ele.Q_score*4;
        break
      case 16:
        categoryScoreArr[3] += ele.Q_score*4;
        break
      default:
        break
    }
  });
  totalScore = (categoryScoreArr[0] + categoryScoreArr[1] + categoryScoreArr[2] + categoryScoreArr[3]) / 5

  Item.updateMany({ _id: req.body._id }, { $set: { QArr: QArr, isScore: true, totalScore: totalScore, categoryScore: categoryScoreArr } })
    .then(() => { res.status(200).send(true) })
    .catch(err => res.status(500).send(err));
});

/* DELETE items(item delete) */
router.delete('/', function (req, res, next) {
  let id = req.query._id;
  Item.deleteOne({ _id: id })
    .then(() => { res.status(200).send(true) })
    .catch(err => res.status(500).send(err));
});

module.exports = router;


