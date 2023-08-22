import express from "express";
import { isAdmin, requirelogin } from './../middlewares/auhtMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, updateProductController } from "../controllers/ProductController.js";

const router=express.Router();

//POST METHOD - Create PRoduct
router.post('/create-product',requirelogin,isAdmin,createProductController)

//GET METHOD - Get Products
router.get('/get-product',getProductController)

//GET METHOD -  Get Single Product
router.get('/get-product/:slug',getSingleProductController)


//POST METHOD - Update Prdouct 
router.put('/update-product/:pid',requirelogin,isAdmin,updateProductController)

//DELETE METHOD - Delete Product
router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFiltersController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requirelogin, brainTreePaymentController);

export default router