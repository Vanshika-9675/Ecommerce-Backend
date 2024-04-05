const express = require("express");
const router = express.Router();
const { authenticateUser} = require('../controllers/middlewares');
const {login, signup} = require("../controllers/auth");
const {getAllProducts} = require('../controllers/product');
const {addOrder,getUserOrders} = require('../controllers/Order');
const {addWish,getUserwishes,deleteWish} = require('../controllers/wishList');
const {addToCart,fetchCartProducts,removeProduct,decreaseQuantity,increaseQuantity,removeAllProducts} = require('../controllers/cart')
const {fetchCategory} = require("../controllers/categories");

router.post("/login",login);
router.post("/signup",signup);

router.get('/product',getAllProducts);

router.get('/product/:category',fetchCategory);

router.post('/order',authenticateUser,addOrder);
router.get('/order',authenticateUser,getUserOrders)

router.post('/wish',authenticateUser,addWish);
router.get('/wish',authenticateUser,getUserwishes);
router.delete('/wish/:_id',authenticateUser,deleteWish);

router.post('/cart', authenticateUser, addToCart);
router.get('/cart', authenticateUser, fetchCartProducts);
router.delete('/cart', authenticateUser, removeAllProducts);
router.delete('/cart/:productId', authenticateUser, removeProduct);
router.put('/cart/decrease/:productId', authenticateUser, decreaseQuantity);
router.put('/cart/increase/:productId', authenticateUser, increaseQuantity);

module.exports = router;