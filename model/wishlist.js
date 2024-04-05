const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
     image:{
        type:String,
     },
     title:{
        type:String,
     },
     price:{
        type:Number,
     }
})

const wish = mongoose.model('wish', wishSchema);
module.exports = wish;