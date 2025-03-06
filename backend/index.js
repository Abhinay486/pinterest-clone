import express from 'express'
import dotenv from 'dotenv'
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary";

dotenv.config();
cloudinary.v2.config({
    cloud_name : process.env.cloudName,
    api_key : process.env.cloudApi,
    api_secret : process.env.cloudSecret,
});

const app = express()

const port = process.env.port;

app.get("/", function(req, res, next){

})

//middle wares
app.use(express.json())
app.use(cookieParser());
// importing the routes
import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js' 
//using routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);


app.listen(port, () => {
    console.log(`server runnning on port ${port}`);
    connectDb();
});

