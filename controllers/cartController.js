const Cart = require("../models/cartModel");
const Product = require('../models/adminModel');

exports.addToCart = async (req, res) => {
    const { user_id } = req.user; // fixed destructuring
    const { product_id, quantity } = req.body;

    try {
        // Check if a cart already exists for the user
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            // If no cart exists, create a new cart
            const newCart = new Cart({
                user_id,
                products: [
                    {
                        product_id,
                        quantity,
                    }
                ],
            });
            await newCart.save();
            return res.json( "New Cart created for new user" );
        }

        // If the cart exists, check if the product is already in the cart
        const productIndex = cart.products.findIndex((prod) => prod.product_id.toString() === product_id.toString());
        if (productIndex > -1) {
            // Update quantity if the product exists in the cart
            cart.products[productIndex].quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.products.push({ product_id, quantity });
        }

        await cart.save();
        return res.status(201).json({ message: "Cart is updated successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//getcart

exports.viewCart= async(req,res)=>{
    const {userId}= req.user;
    let cart= await Cart.findOne({userId});

    if(!cart){
        return res.status(404).json({ message: "Cart not found" });
    }
    try{
        let subtotal=0;
        const cartItems= await Promise.all(
        cart.products.map(async (product)=>{
            console.log("product id:",product.id);
            const productDetails= await Product.findOne({id:product.product_id})   
            console.log(productDetails);
            subtotal+=productDetails.price*product.quantity;
            return{
                product_id:productDetails.id,
                title: productDetails.title,
                description: productDetails.description,
                price: productDetails.price,
                image: productDetails.image,
                quantity:product.quantity,
            };
        })
    )
    // console.log(cartItems);
    return res.status(200).json({cartItems:cartItems,subtotal});
}catch (error) {
    console.error("error:" ,error);
    return res.status(500).json({ message: "Server error",error });
}

}

//delete

exports.deleteCartProduct=async(req,res)=>{
    const {user_id} = req.user

    const product_id= req.params.id
    const cart = await Cart.findOne({user_id})
    if(!cart){
        return res.status(404).json({message:"Cart Not Found"});
    }
    const isProductValid = cart.products.find(
        (product) =>product_id === product.product_id
    );
    if(!isProductValid){
        return res.status(404).json({message:"Product not found in cart"})
    }
    if(cart.products.length <= 1){
        await Cart.deleteOne({user_id});
        return res.status(200).json({message : "Cart deleted Successfully"})
    }else{
        cart.products=cart.products.filter((prod) => prod.id != product_id);
        cart.save();
        res.status(200).json({message : "Cart deleted successfully"});
    }

}