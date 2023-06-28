import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import authRoute from './routes/auth/auth.js';
import profile from './routes/profile/profile.js'
import verifyToken from './middlewares/auth/verifyToken.js';
import mongoose from 'mongoose';
import verifyApplication from './middlewares/app/verifyApplication.js';

// env vars
config();
const port = process.env.PORT || 3001;
const mongo_url =  process.env.MONGO_URL;

// DB connection
mongoose.connect(mongo_url).then(() => {
    console.log("MongoDB Connected.");
}).catch((err) => console.log(`MongoDB connection error ${err.message}`));


// app config
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status'));

// application api_key validation middleware
app.use(verifyApplication);

// routes
app.use(authRoute);
app.use("/profile", verifyToken, profile);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});