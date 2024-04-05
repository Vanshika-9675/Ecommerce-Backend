const express = require("express");
const router = express.Router();

const {SellerSignup,SellerLogin} = require("../controllers/SellerAuth");
const { addProduct ,fetchSellerProducts,deleteProduct,updateProduct ,fetchSellerOrders} = require("../controllers/product");
const {authenticateSeller} = require("../controllers/middlewares")


router.post("/login",SellerLogin);
router.post("/signup",SellerSignup);   


router.get("/orders",authenticateSeller,fetchSellerOrders)
router.post("/product",authenticateSeller,addProduct);
router.get("/product",authenticateSeller,fetchSellerProducts);
router.put('/product',authenticateSeller,updateProduct);
router.delete('/product/:productId',authenticateSeller,deleteProduct);

module.exports = router;