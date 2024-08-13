const user = require("../models/userModel");
const {v4:uuidv4} = require('uuid');
exports.createUser = async (req, res) =>{
    try{
    const{name,email,password}=req.body;
    const User = new user({
        id:uuidv4(),
        name,email,password
    })
    await User.save();
    res.status(200).json("User created successfully");
 }catch(err){
    console.error(err);
    res.status(500).json({message:"User created successfully"});
 }
 };