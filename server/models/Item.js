  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema(
    {
        _id : String,
        name: String,
    }
);

module.exports = Item = mongoose.model('item', ItemSchema, 'testdb');    // 'items'는 컬렉션 이름 