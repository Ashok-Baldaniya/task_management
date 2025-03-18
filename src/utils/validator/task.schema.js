import Joi from 'joi';

export const taskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed'),
    completed_at: Joi.date().optional(),
    isDeleted: Joi.boolean().default(false).optional()
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    description: Joi.string().min(5).optional(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
    isDeleted: Joi.boolean().default(false).optional()
});