const User=require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

exports.login=async (req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
          return res.status(400).json("invalid email or password")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json("invalid email or password")
        }
        const token =jwt.sign({user_id: user._id},'secret_token',{
            expiresIn: '1h'
        });
        res.status(200).json({token,isAdmin: user.isAdmin});
    }catch(err){
    console.error(err);
    }
}
