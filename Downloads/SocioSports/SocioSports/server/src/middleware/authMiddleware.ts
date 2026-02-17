import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sociosports-secret-key';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

export const optionalAuthenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (!err) {
            req.user = user;
        }
        next();
    });
};
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
};

// Alias for consistency with other route files
export const requireAdmin = isAdmin;
