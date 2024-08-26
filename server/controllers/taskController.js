const db = require('../config');
const Task = require('../model/task')

const createTask = async (req, res) => {
    try {
        const { title, description, dateGiven, deadline, assignedTo, priority, status = 'todo', category } = req.body;

        // Ensure date fields are valid
        if (isNaN(new Date(dateGiven).getTime()) || isNaN(new Date(deadline).getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const task = new Task({
            title,
            description,
            dateGiven: new Date(dateGiven),
            deadline: new Date(deadline),
            assignedTo,
            priority,
            status,
            category,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['todo', 'inProgress', 'done'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.status = status;
        task.updatedAt = new Date();

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask };


