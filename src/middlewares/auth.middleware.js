import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/apiResponse.js';
import { userList } from '../services/auth.service.js';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test');

            const user = userList.find(u => u.email === decoded.email);
            if (!user) {
                return sendResponse(res, 401, 'User not authorized to access');
            }

            req.user = user.email;

            next();
        } catch (error) {
            return sendResponse(res, 500, 'Not authorized, token failed', null, error);
        }
    }

    if (!token) {
        return sendResponse(res, 500, 'Not authorized, no token provided');
    }
};