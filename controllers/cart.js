const User = require("../model/User");
const Product = require("../model/products");
const Cart = require("../model/Cart")

exports.addToCart = async (req, res) => {
    try {
        const { _id, title, price, image ,sellerId} = req.body;
        
        const userId = req.user.id;

        const existingProduct = await Cart.findOne({ userId, productId: _id });


        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.totalprice += price;
            await existingProduct.save();
        }
        else {
            await Cart.create({ userId, productId: _id, title, price, image, quantity: 1, totalprice: price ,sellerId});
        }

        return res.status(200).json({ success: true, message: 'Product added to cart' });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to add product to cart' });
    }
};

exports.increaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;

        const cartProduct = await Cart.findOne({ userId, productId });

        if (!cartProduct) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        cartProduct.quantity++;
        cartProduct.totalprice += cartProduct.price;
        await cartProduct.save();

        return res.status(200).json({ success: true, message: 'Quantity increased' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to increase quantity' });
    }
};

exports.decreaseQuantity = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;



        const cartProduct = await Cart.findOne({ userId, productId });

        if (!cartProduct) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        if (cartProduct.quantity === 1) {
            await Cart.deleteOne({ userId, productId });
        } else {
            cartProduct.quantity--;
            cartProduct.totalprice -= cartProduct.price;
            await cartProduct.save();
        }

        return res.status(200).json({ success: true, message: 'Quantity decreased' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to decrease quantity' });
    }
};


exports.fetchCartProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartProducts = await Cart.find({ userId });

        return res.status(200).json({ success: true, cartProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to fetch cart products' });
    }
};


exports.removeProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.id;
    
        await Cart.findOneAndDelete({ userId, productId });
        
        return res.status(200).json({ success: true, message: 'Product removed from cart' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to remove product from cart' });
    }
};

exports.removeAllProducts = async (req, res) => {
    try {

        const userId = req.user.id;

        await Cart.deleteMany({ userId });

        return res.status(200).json({ success: true, message: 'All products removed from cart' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to remove products from cart' });
    }
};