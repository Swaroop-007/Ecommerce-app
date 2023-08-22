import JWT from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';


//Routes Protected with token
export const requirelogin = async (req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SEC);
        req.user= decode;
        next();


    } catch (error) {
        console.log(error);
    }
}

//Admin access

export const isAdmin = async (req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role===false){
            return res.status(401).send({
                success:false,
                message :'Unauthorized access'
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin auth'
        })
    }
}