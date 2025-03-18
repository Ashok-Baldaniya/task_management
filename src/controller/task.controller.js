import { Task } from '../models/task.model.js';
import { sendResponse } from '../utils/apiResponse.js';


export const getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10, } = req.query;

        const pageNum = parseInt(page);
        const skip = (pageNum - 1) * limit;

        const tasks = await Task.find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Task.countDocuments({ isDeleted: false });

        return sendResponse(res, 200, 'All task fetched successfully', { tasks, total });
    } catch (error) {
        return sendResponse(res, 500, 'Failed to fetch tasks', null, error);
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return sendResponse(res, 404, 'Task not found');
        }

        return sendResponse(res, 200, 'Task fetched successfully', task);
    } catch (error) {
        return sendResponse(res, 500, 'Failed to fetch task', null, error);
    }
};

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        return sendResponse(res, 200, 'Task created successfully', task);
    } catch (error) {
        return sendResponse(res, 500, 'Failed to create task', null, error);
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body.status === 'completed') {
            req.body.completed_at = new Date();
        }

        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return sendResponse(res, 404, 'Task not found');
        }

        return sendResponse(res, 200, 'Task updated successfully', updatedTask);
    } catch (error) {
        return sendResponse(res, 500, 'Failed to update task', null, error);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndUpdate(id, {
            status: 'deleted', isDeleted: true
        }, { new: true });

        if (!deletedTask) {
            return sendResponse(res, 404, 'Task not found');
        }

        return sendResponse(res, 200, 'Task deleted successfully', deletedTask);
    } catch (error) {
        return sendResponse(res, 500, 'Failed to delete task', null, error);
    }
};
