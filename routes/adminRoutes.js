const adminController = require('../controllers/adminController')
const express = require('express');
const router = express.Router();
const auth =require("../middlewares/auth")

router.get("/get",adminController.getProducts)
router.post("/create",auth,adminController.createProduct)
router.put("/:id",adminController.updateProduct)
router.delete("/:id",adminController.deleteProduct)
module.exports=router    