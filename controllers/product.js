const Product = require("../model/products");
const Seller = require("../model/Seller")

exports.getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } 
    catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { title, price, image ,category} = req.body;
        const sellerId = req.seller.id; 

        const product = await Product.create({ title, price, image ,category,sellerId});

        const seller = await Seller.findById(sellerId);

        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
    
        seller.sellerProducts.push(product);
        await seller.save();

        res.status(200).json({ message: "Product added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.fetchSellerProducts = async (req, res) => {
    try {
        const sellerId = req.seller.id; 

        const seller = await Seller.findById(sellerId).populate('sellerProducts');
        
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }

        res.status(200).json({ products: seller.sellerProducts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.fetchSellerOrders = async (req,res)=>{
    try {
        const sellerId = req.seller.id; 

        const seller = await Seller.findById(sellerId).populate('sellerOrders');
        
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
        res.status(200).json({ products: seller.sellerOrders });

        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {productId, title, price, image} = req.body;
        const sellerId = req.seller.id; 
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, 
            { title, price, image }, 
            { new: true }
            );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const seller = await Seller.findById(sellerId);


        if (!seller) {
            return res.status(404).json({ message: "Seller not found for the product" });
        }

        const index = seller.sellerProducts.findIndex(product => product.equals(productId));

        if (index === -1) {
            return res.status(404).json({ message: "Product not found in seller's products" });
        }


        seller.sellerProducts[index] = updatedProduct;
        await seller.save();

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const sellerID = req.seller.id;
        const productId = req.params.productId; 


        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            console.log("Product not found!");
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const seller = await Seller.findOne({_id: sellerID});

        seller.sellerProducts = seller.sellerProducts.filter((item) => item._id.toString() !== productId);


        await seller.save();

        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
        
    } catch (error) {
        console.error("Delete product error:", error);
        res.status(400).json({ message: error.message });
    }
};
