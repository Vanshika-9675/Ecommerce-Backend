const Product = require("../model/products");

exports.fetchCategory = async(req,res)=>{
    try {
        const category = req.params.category;
        
        const products = await Product.find({ category });

        res.status(200).json({
            success:true,
            data:products
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}


