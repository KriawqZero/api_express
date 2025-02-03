import jwt from 'jsonwebtoken';
import { config } from '../config';

export const auth = (req: any, res: any, next: any) => {
    const token = req.get("Authorization")?.split(" ")[1];

    if(!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, config.token_secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}