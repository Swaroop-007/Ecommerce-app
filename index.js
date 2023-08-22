import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'



// env configuration to protect seceret codes
dotenv.config()
const PORT=process.env.PORT||8080;

// connection to mongodb atlas
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connection is successful")).catch((err)=>{
    console.log(err);
});

//rest api object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/products",productRoute);

//rest api
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on Port ${PORT}!`))