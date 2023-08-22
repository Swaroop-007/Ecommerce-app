import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import braintree from "braintree";
import dotenv from "dotenv";
import OrderModel from "../models/OrderModel.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

//Create Product Controller - To add new products
export const createProductController= async (req,res) =>{
    try {
        const {title,image,desc,price,category,size,color,inStock,brand} = req.body;
        if(!title){
            return res.send({error:'Title is required'})
        }
        if(!image){
            return res.send({error:'Image is required'})
        }
        if(!desc){
            return res.send({error:'Description is required'})
        }
        if(!price){
            return res.send({error:'Price is required'})
        }
        if(!category){
            return res.send({error:'Category is required'})
        }
        if(!size){
            return res.send({error:'Size is required'})
        }
        if(!color){
            return res.send({error:'Color is required'})
        }
        if(!inStock){
            return res.send({error:'In Stock is required'})
        }
        if(!brand){
            return res.send({error:'Brand is required'})
        }

        const products= new ProductModel({...req.body, slug:slugify(title)})

        await products.save()
        res.status(201).send({
            success:true,
            message: 'Products created successfully.',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false
        })
        
    }
}

// To get all existing products
export const getProductController = async(req,res)=>{
    
    try {
        const products= await ProductModel.find({}).populate("category").limit(15).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:"All Products",
            products,
            total: products.length,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
    });
    }
}

//To get single product
export const getSingleProductController = async(req,res)=>{
    try {
        const product = await ProductModel
        .findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Single Product Fetched Successfully",
            product,
    });
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng a product",
      error,
    });
    }
}

export const updateProductController = async(req,res)=>{
    try {
        const {title,image,desc,price,category,size,color,inStock,brand} = req.body;
        if(!title){
            return res.send({error:'Title is required'})
        }
        if(!image){
            return res.send({error:'Image is required'})
        }
        if(!desc){
            return res.send({error:'Description is required'})
        }
        if(!price){
            return res.send({error:'Price is required'})
        }
        if(!category){
            return res.send({error:'Category is required'})
        }
        if(!size){
            return res.send({error:'Size is required'})
        }
        if(!color){
            return res.send({error:'Color is required'})
        }
        if(!inStock){
            return res.send({error:'In Stock is required'})
        }
        if(!brand){
            return res.send({error:'Brand is required'})
        }
        const products = await ProductModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.body, slug: slugify(title) },
            { new: true }
          );
        await products.save();
          res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
          });


    } catch (error) {
        
    }
}

export const deleteProductController = async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting product",
          error,
        });
    }
}

export const productFiltersController = async (req, res) => {
    try {
      const { cat, brand } = req.body;
      let args = {};
      if (cat.length > 0) args.category = cat;
      if (brand.length) args.brand = brand;
      const products = await ProductModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };

  //payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
  export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new OrderModelrderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };