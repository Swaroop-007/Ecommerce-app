import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    title:{type:String,required:true},
    slug:{
        type:String,
        required:true,   
    },
    image:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    size:{type:Array,required:true},
    color:{type:Array,required:true},
    inStock:{type:Boolean},
    brand:{type:String},
},{timestamps:true});

export default mongoose.model('Products',productSchema)