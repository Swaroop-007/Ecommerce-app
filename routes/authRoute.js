import express from "express";
import {getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController} from '../controllers/authController.js';
import { requirelogin,isAdmin } from "../middlewares/auhtMiddleware.js";
//router initialization
const router= express.Router();

//Register User(POST METHOD)

router.post('/register',registerController)

// LOGIN USER (POST METHOD)

router.post('/login',loginController)


//protected user route

router.get('/user-auth',requirelogin, (req,res)=>{
    res.status(200).send({ok:true})
});


// protected admin auth route
router.get('/admin-auth',requirelogin,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
});

//orders
router.get("/orders", requirelogin, getOrdersController);

//all orders
router.get("/all-orders", requirelogin, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requirelogin,
  isAdmin,
  orderStatusController
);


export default router