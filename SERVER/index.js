import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const PORT = process.env.PORT || 5555;
const URL = process.env.MONGO_URL || "mongodb+srv://dakshchawla:doctorDaksh@techhaven.bgq6j.mongodb.net/";

import authRoute from './routes/authRoutes.js';
import productRoute from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';

import connectDb from './dbConnect.js';
connectDb(URL)
    .then(()=>{console.log("connected to database")})
    .catch(()=>{console.log("error connecting to database")})

const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth',authRoute);
app.use('/user',userRoutes);
app.use('/products',productRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});


app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
