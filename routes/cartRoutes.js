const cartController = require('../controllers/cartController')
const express = require('express');
const router = express.Router();
const auth=require("../middlewares/auth.js")

router.post("/createcart",auth,cartController.addToCart)
router.get("/getcart",auth,cartController.viewCart)
router.delete("/deletecart/:product_id",auth,cartController.deleteCartProduct)

module.exports=router  