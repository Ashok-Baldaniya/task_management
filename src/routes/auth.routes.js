import { Router } from 'express';
import { loginUser } from '../controller/auth.controller.js';
import { validateRequest } from '../middlewares/validation.middleware.js';
import { loginSchema } from '../utils/validator/user.schema.js';


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticate user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "your_jwt_token_here"
 *       401:
 *         description: Invalid credentials
 */


const authRouter = Router();

authRouter.post('/login', validateRequest(loginSchema), loginUser);

export { authRouter };