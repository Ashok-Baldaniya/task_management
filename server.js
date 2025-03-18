import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './src/config/db.js';
import { taskRouter } from './src/routes/task.routes.js';
import { authRouter } from './src/routes/auth.routes.js';
import swaggerDocs from './swagger.js';
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});