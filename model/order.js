const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId:{
      type:String
    },
     image:{
        type:String,
     },
     price:{
        type:Number,
     },
     quantity:{
        type:Number,
     },
     totalprice:{
        type:Number
     }
})

const Order = mongoose.model('order', orderSchema);
module.exports = Order;