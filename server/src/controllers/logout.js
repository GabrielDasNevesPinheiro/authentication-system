import express from 'express';
import ExpiredToken from '../models/ExpiredToken.js';

const router = express.Router();

router.post('/logout', async (req, res) => {

    const auth = req.headers.authorization;

    try { // here we delete the session token
        
        const invalidToken = new ExpiredToken({ token: auth });
        await invalidToken.save();
        res.status(200).json({ message: "Logged out." });
    
    } catch (error) {
        res.status(409).json({ error: "Could not logout." });
    }



});

export default router;