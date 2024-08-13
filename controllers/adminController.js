const Product = require("../models/adminModel");
const {v4:uuidv4} = require('uuid');

exports.getProducts = async(req,res)=>{
    try{
        const products = await Product.find();
        res.send(products);
    }catch(err){
        console.error(err);
    }

};

 exports.createProduct = async (req, res) =>{
    try{
    const{title,description,price,category,rating,image}=req.body;
    const product = new Product({
        id:uuidv4(),
        title,
        description,
        category,
        rating,
        image 
    })
    await product.save();
    res.status(200).json("Product created successfully");
 }catch(err){
    console.error(err);
    res.status(500).json({message:"Product created successfully"});
 }
 };
 exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, rating, image } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, category, rating, image },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while updating the product" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while deleting the product" });
    }
};