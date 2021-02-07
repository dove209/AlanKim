  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema(
    {
        upTime: String,
        storeName: String,
        dong: String,
        city: String,
        storeType: String,
        price: String,
        isParking: String,
        isScore: Boolean,
        QArr: Array,
        totalScore: Number,
        categoryScore: Array,
    }, {
        versionKey: false   //마지막 __v 제거
    }
);

module.exports = Item = mongoose.model('item', ItemSchema);  // 'item'은 컬렉션itmes의 단수 표현(자동으로 items로 변경됨) 