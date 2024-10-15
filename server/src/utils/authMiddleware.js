import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { config } from '../config/config.js';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        console.error(err);
        res.sendStatus(403);
    }
};
