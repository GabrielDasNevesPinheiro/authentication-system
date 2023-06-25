import express from 'express';
import login from '../../controllers/login.js';
import register from '../../controllers/register.js';
import logout from '../../controllers/logout.js';
import verifyToken from '../../middlewares/auth/verifyToken.js';


const router = express.Router();

router.use("/auth", login);
router.use("/auth", register);
router.use("/auth", verifyToken, logout);

export default router;