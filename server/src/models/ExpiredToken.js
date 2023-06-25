import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
});

const ExpiredToken = new mongoose.model('token', tokenSchema);

export default ExpiredToken;