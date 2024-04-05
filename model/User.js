const mongoose = require("mongoose");
const Order = require('./order'); 
const wish = require('./wishlist')
const Cart = require('./Cart.js')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    cart:[Cart.schema],
    orders: [Order.schema],
    wishlist: [wish.schema],
});

module.exports = mongoose.model("User", UserSchema);
