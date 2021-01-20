  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema(
    {
        _id : String,
        title: String,
        author: String,
        copies: Number
    }
);

module.exports = Item = mongoose.model('item', ItemSchema, 'items');    // 'items'는 컬렉션 이름 