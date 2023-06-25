import { config } from "dotenv"

config();

const valid_key = process.env.API_KEY;

// aditional security layer, nobody can request this back-end without the defined ultra secret code.
const verifyApplication = (req, res, next) => {

    const { api_key } = req.headers;

    if (api_key !== valid_key) return res.status(403).json({ error: "Forbidden." });

    next();

}


export default verifyApplication;