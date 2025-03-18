import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResponse } from "../utils/apiResponse.js";
import { userList } from '../services/auth.service.js';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = userList.find(u => u.email === email);
        if (!user) {
            return sendResponse(res, 401, 'Invalid credentials');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return sendResponse(res, 401, 'Invalid credentials');
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return sendResponse(res, 200, 'User login success', { token });
    } catch (error) {
        console.log('Error while login', error);
        return sendResponse(res, 500, 'Failed to login', null, error);
    }
};
