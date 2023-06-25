import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
    }
});

const User = new mongoose.model('User', userSchema);

export default User;