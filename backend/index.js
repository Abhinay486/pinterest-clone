import express from 'express'
import dotenv from 'dotenv'
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express()

const port = process.env.port;

app.get("/", function(req, res, next){

})

//middle wares
app.use(express.json())
app.use(cookieParser());
// importing the routes
import userRoutes from './routes/userRoutes.js';

//using routes
app.use("/api/user", userRoutes);


app.listen(port, () => {
    console.log(`server runnning on port ${port}`);
    connectDb();
});

