const jwt = require("jsonwebtoken");

const auth =(req,res,next)=>{
    if(!req.header("Authorization")){ 
        return res.status(401).json({error:"No token,authorization denied"}); //to avoid split is not valid error which occurs when the token is not given in the header
    }
    const token = req.header("Authorization").split(" ")[1];

    if(!token){
        return res.status(401).json({error:"No token,authorization denied"});
    }
    try{
        const decoded =jwt.verify(token,"secret_token");
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({error:"Token is not valid"})
    }
};
module.exports=auth;