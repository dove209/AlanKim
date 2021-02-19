let express = require('express');
let router = express.Router();
let fs = require('fs');

// Profile Model
const Profile = require('../../models/profile');

var multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profiles/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});


//남길랭 작성이 업로드한 사진 불러오기
router.get('/:imgName', function (req, res) {
  let imgName = (req.params.imgName);
  fs.readFile(__dirname + `../../../uploads/${imgName}`, function (err, data) {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(data);
  })
})

/* UPDATE Profile Path */
router.post('/profile', function (req, res, next) {
  Profile.create(req.body)
  .then(() => res.status(200).send(true))
  .catch(err => res.status(500).send(err));
})

/* 프로필 이미지 등록 */
router.put('/profile', upload.single("photo"), function (req, res, next) {
  let file = req.file;
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
    res.status(200).send(true)
  } else {
    res.status(201).send('fileType_err');
  }
});

/* 프로필 이미지 가져오기 */
router.get('/profile/:token', function(req, res, next) {
  let token = req.params.token.split('&')[0];
  Profile.find({ token: token }).sort({ upTime:'desc'})
    .then(profle => {
      if(profle.length != 0){
        //프로필 이미지 보내기
        fs.readFile(__dirname + `../../../profiles/${profle[0].fileName}`, function (err, data) {
          res.writeHead(200, { 'Content-Type': 'image/jpg' });
          res.end(data);
        })
      } 
    })
    .catch(err => res.status(500).send(err));
})
module.exports = router;