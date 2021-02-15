let express = require('express');
let router = express.Router();
let fs = require('fs');

//남길랭 작성이 업로드한 사진 불러오기
router.get('/:imgName', function (req, res) {
  let imgName = (req.params.imgName);
  fs.readFile(__dirname + `../../../uploads/${imgName}`, function (err, data) {
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(data);
  })
})

module.exports = router;