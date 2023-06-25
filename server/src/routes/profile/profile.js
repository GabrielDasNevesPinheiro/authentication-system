import express from 'express';
import User from '../../models/User.js';
import ExpiredToken from '../../models/ExpiredToken.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const privatekey = process.env.JWT_SECRET;

const router = express.Router();

router.get("/", (req, res) => { // this route is only for authenticated users
    res.status(200).json({ message: `Welcome to your profile ${req.user}` });
});

router.delete("/", async (req, res) => { // this route can be used to delete accounts
    
    const token = req.headers.authorization;

    try {
        
        const expiredToken = new ExpiredToken({ token });

        await User.findOneAndRemove({ username: req.user });
        await expiredToken.save();
        
        res.status(200).json({ message: "Account Deleted." });

    } catch (error) {
        res.status(404).json({ error: "Not Found." });
    }

});

router.patch("/", async (req, res) => { // change user information

    const newUsername = req.body.username;
    const password = req.body.password;
    const token = req.headers.authorization;

    try {



        // Getting logged user + checking password
        const user = await User.findOne({ username: req.user });
        const isAuthorized = await bcrypt.compare(password, user.password);

        // authorization (password) check + data validation
        if(!isAuthorized || newUsername === user.username) return res.status(400).json({ error: "Bad Request." });

        // storing new username in username const (for token generation) + updating user information
        // then create new token based on new user
        const username = newUsername;
        const newUser = await User.findOneAndUpdate({ username: req.user}, { username: newUsername });
        const newToken = jwt.sign({ username }, privatekey, { expiresIn: "24h" });

        // put the old account token on blacklist
        const expiredToken = new ExpiredToken({ token });
        await expiredToken.save();

        res.status(200).json({ message: "Data Updated.", token: newToken });
        
    } catch (error) {
        res.status(400).json({ error: "Bad Request." });
    }

});

export default router;