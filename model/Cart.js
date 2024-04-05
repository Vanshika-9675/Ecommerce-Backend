const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
      userId:{
        type:String
      },
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
        type:Number,
        default: 0
     },
     sellerId:{
       type: mongoose.Schema.ObjectId
     }
})
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;