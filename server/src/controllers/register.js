import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isRegistered = await User.findOne({ username }); // if user exists in database isRegistered = true

    if(isRegistered) return res.status(409).json({ error: "Conflict within server information" });
    
    try { // save new user
        
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Account Registered." });
        
    } catch (error) {
        res.status(409).json({ error: "No valid data." });
    }


});

export default router;