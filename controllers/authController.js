import UserModel from "../models/UserModel.js"
import OrderModel from "../models/OrderModel.js"
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";


//Password encryption using bcrypt
const hashPassword = async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.log(error);
    }
  };
 
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };

//REGISTER CONTROLLER to register new user
export const registerController= async (req,res)=>{
    try{    
        const {name,email,password,phone,address} = req.body

        //validations
        if(!name){
            return res.send({error:'Your name is required'})
        }
        if(!email){
            return res.send({error:'Your email is required'})
        }
        if(!password){
            return res.send({error:'Your password is required'})
        }
        if(!phone){
            return res.send({error:'Your phone number is required'})
        }
        //check existing user
        const registerdUser= await UserModel.findOne({email})
        if(registerdUser){
            return res.status(200).send({
                success:false,
                message:'Email already registered. Please Login'
            })
        }

        //Register a new user and save it to DB
        const hashedPassword= await hashPassword(password)

        const user= await new UserModel({name,email,phone,password:hashedPassword}).save()

        res.status(200).send({
            success:true,
            message : "User Registered Successfully",
            user
        })
       
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
    }

//LOGIN (POST METHOD)
export const loginController= async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(404).send({success:false,
            message:'Invalid email or password'})
        }

        //check if user is in the db
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const compare= await comparePassword(password,user.password)
        if(!compare){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })

        }
        //JWT token
        const token= await JWT.sign({_id:user._id},process.env.JWT_SEC,{expiresIn:"5d"});
        res.status(200).send({
            success:true,
            message:'Login successful',
            user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    role:user.role,
            },
            token,
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
        
    }
};

export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  
  //orders
  export const getOrdersController = async (req, res) => {
    try {
      const orders = await OrderModel
        .find({ buyer: req.user._id })
        .populate("products","-image")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await OrderModel
        .find({})
        .populate("products", "-image")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };