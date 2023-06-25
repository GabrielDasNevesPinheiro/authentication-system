import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import ExpiredToken from '../../models/ExpiredToken.js';

config();
const privatekey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    
    const auth = req.headers.authorization;

    try {

        // verify if token is valid
        const isExpired = await ExpiredToken.findOne({ token: auth });
        if (isExpired) return res.status(403).json({ error: "Access Denied." });

        // decoded object contains some session information
        const decoded = jwt.verify(auth, privatekey);
        req.user = decoded.username;

        next();

    } catch (error) {
        res.status(403).json({ error: "Access Denied." });
    }
}

export default verifyToken;