// const cartController = require('../controllers/cartController')
// const express = require('express');
// const router = express.Router();
// const auth=require("../middlewares/auth.js")

// router.post("/createcart",auth,cartController.addToCart)
// router.get("/getcart",auth,cartController.viewCart)
// router.delete("/deletecart/:product_id",auth,cartController.deleteCartProduct)

// module.exports=router  

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');  // Assuming you have an auth middleware

router.post('/createcart', auth, cartController.addToCart);
router.get('/getcart', auth, cartController.viewCart);
router.delete('/deletecart/:product_id', auth, cartController.deleteCartProduct);

module.exports = router;
