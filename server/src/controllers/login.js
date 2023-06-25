import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const router = express.Router();
const privatekey = process.env.JWT_SECRET

router.post("/login", async (req, res) => {
    
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user) return res.status(404).json({ error: "Not Found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json({ error: "Access Denied." });

    const token = jwt.sign({ username }, privatekey, { expiresIn: "24h"});
    
    res.status(200).json({ message: "Login Successful.", token: token });
});

export default router;