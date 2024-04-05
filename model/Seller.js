const mongoose = require("mongoose");
const Product = require('../model/products');
const Order = require("./order");

const SellerSchema = new mongoose.Schema({
    SellerUserName: {
        type: String,
        required: true,
        trim: true
    },
    SellerEmail: {
        type: String,
        required: true,
        trim: true
    },
    SellerPassword:{
        type: String,
        required: true,
    },
    sellerProducts: [Product.schema],
    sellerOrders:[Order.schema]
});

module.exports = mongoose.model("Seller", SellerSchema);
