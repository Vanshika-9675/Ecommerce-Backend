const User = require("../model/User");
const Product = require("../model/products");

exports.addWish = async (req, res) => {
    try {
        const { image,title,price, _id } = req.body; 


        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const existingProduct = await Product.findOne({ _id:_id});

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        user.wishlist.push({ image, price,title});
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to wishlist',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add product to wishlist',
        });
    }
};


exports.getUserwishes = async (req, res) => {
    try {
         const userId = req.user.id;

         const user = await User.findById(userId).populate('wishlist');

        if (!user) {
            console.log("User not found!");
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            wishlist: user.wishlist,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed',
        });
    }
};


exports.deleteWish = async (req, res) => {
    try {

        console.log("hey");
        const userId = req.user.id;
        const { _id } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found!");
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const index = user.wishlist.findIndex(wish => wish._id.toString() === _id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Wish not found in user wishlist',
            });
        }

        user.wishlist.splice(index, 1);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Wish removed from user wishlist',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to remove wish from user wishlist',
        });
    }
};
