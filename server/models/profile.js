  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema(
    {
        token: String,
        fileName: String,
        upTime: String,
    }, {
        versionKey: false   //마지막 __v 제거
    }
);

module.exports = Item = mongoose.model('profile', ProfileSchema);  // 'profile'은 컬렉션profiles의 단수 표현(자동으로 profiles로 변경됨) 